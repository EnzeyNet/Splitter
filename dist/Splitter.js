(function (angular) {
    "use strict";

	var directives = angular.module('net.enzey.splitter', []);

	directives.directive('nzFlexResize', function ($parse, $document, $timeout) {
		return {
			compile: function ($element, $attrs) {
				var directiveName = this.name;
				var children = $element.children();
				if (!children) {
					throw "Cannot find any children below 'nzSplitter'!";
				}

				var position = $attrs[directiveName];
				if (!angular.isDefined(position) || position.length === 0) {
					throw "position of the splitter is required! Valid values a NSEW."
				}

				if (children.length < position.length) {
					throw "More positions specified than available child elements to split.";
				}

				var isNorth = function(value) {
					return /N/gi.test(value);
				};
				var isSouth = function(value) {
					return /S/gi.test(value);
				};
				var isEast = function(value) {
					return /E/gi.test(value);
				};
				var isWest = function(value) {
					return /W/gi.test(value);
				};

				var setupResizeOnGripper = function(gripper) {
					gripper.on('mousedown', function(event) {
						var gripperContainer = gripper.parent();
						var originalMouseX = event.pageX;
						var originalMouseY = event.pageY;

						var offsetXLeft =   event.originalTarget.offsetLeft;
						var offsetXRight =  gripperContainer[0].clientWidth - event.originalTarget.clientWidth;
						var offsetYTop =    event.originalTarget.offsetTop;
						var offsetYBottom = gripperContainer[0].clientHeight - event.originalTarget.clientHeight;

						var newX;
						var newY;

						var updateContainer = function() {
							if (gripperContainer.hasClass('splitterNorth')) {
								var mouseMove = newY - originalMouseY;
								var newSize = mouseMove + offsetYTop;
								gripperContainer.css('flex-basis', Math.max(0, newSize) + 'px');
								if ($element[0].scrollHeight > $element[0].clientHeight) {
									gripperContainer.css('flex-basis', Math.max(0, newSize - ($element[0].scrollHeight - $element[0].clientHeight)) + 'px');
								}
							} else if (gripperContainer.hasClass('splitterSouth')) {
								var mouseMove = originalMouseY - newY;
								var newSize = mouseMove + offsetYBottom;
								gripperContainer.css('flex-basis', Math.max(0, newSize) + 'px');
								if ($element[0].scrollHeight > $element[0].clientHeight) {
									gripperContainer.css('flex-basis', Math.max(0, newSize - ($element[0].scrollHeight - $element[0].clientHeight)) + 'px');
								}

							} else if (gripperContainer.hasClass('splitterEast')) {
								var mouseMove = newX - originalMouseX;
								var newSize = mouseMove + offsetXLeft;
								gripperContainer.css('flex-basis', Math.max(0, newSize) + 'px');
								if ($element[0].scrollWidth > $element[0].clientWidth) {
									gripperContainer.css('flex-basis', Math.max(0, newSize - ($element[0].scrollWidth - $element[0].clientWidth)) + 'px');
								}
							} else if (gripperContainer.hasClass('splitterWest')) {
								var mouseMove = originalMouseX - newX;
								var newSize = mouseMove + offsetXRight;
								gripperContainer.css('flex-basis', Math.max(0, newSize) + 'px');
								if ($element[0].scrollWidth > $element[0].clientWidth) {
									gripperContainer.css('flex-basis', Math.max(0, newSize - ($element[0].scrollWidth - $element[0].clientWidth)) + 'px');
								}
							}
						}

						var updateFnId;
						var moveEvent = function(event) {
							$timeout.cancel(updateFnId);
							newX = event.pageX;
							newY = event.pageY;
							var updateFnId = $timeout(updateContainer, 50, false);
						};
						$document.on('mousemove', moveEvent);
						var mouseUpEvent = function(event) {
							$document.off('mousemove', moveEvent);
							$document.off('mouseup', mouseUpEvent);
						};
						$document.on('mouseup', mouseUpEvent);
					});
				}

				var gripper = angular.element('<div class="splitterResizer" draggable="true"></div>');

				var firstChild = angular.element(children[0]);
				var lastChild = angular.element(children[children.length - 1]);
				if (isNorth(position)) {
					$element.addClass('splitterVerticalContainer');
					firstChild.addClass('splitterNorth');
					var thisGripper = gripper.clone();
					setupResizeOnGripper(thisGripper);
					firstChild.append(thisGripper);
				}
				if (isSouth(position)) {
					$element.addClass('splitterVerticalContainer');
					lastChild.addClass('splitterSouth');
					var thisGripper = gripper.clone();
					setupResizeOnGripper(thisGripper);
					lastChild.append(thisGripper);
				}
				if (isEast(position)) {
					$element.addClass('splitterHorizontalContainer');
					firstChild.addClass('splitterEast');
					var thisGripper = gripper.clone();
					setupResizeOnGripper(thisGripper);
					firstChild.append(thisGripper);
				}
				if (isWest(position)) {
					$element.addClass('splitterHorizontalContainer');
					lastChild.addClass('splitterWest');
					var thisGripper = gripper.clone();
					setupResizeOnGripper(thisGripper);
					lastChild.append(thisGripper);
				}

				return {
					pre: function (scope, element, attrs, controllers) {
						
					},
					post: function (scope, element, attrs, controllers) {
						
					}
				}
			}
        };
	});

})(angular);
