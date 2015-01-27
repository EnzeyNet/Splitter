(function (angular) {
    "use strict";

	var directives = angular.module('net.enzey.splitter', ['net.enzey.services']);

	directives.directive('nzSplitter', function ($parse, $document, $timeout, nzEventHelper) {
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
					var gripperContainer = gripper.parent();

					var isNorthRegion = gripperContainer.hasClass('splitterNorth');
					var isSouthRegion = gripperContainer.hasClass('splitterSouth');
					var isEastRegion = gripperContainer.hasClass('splitterEast');
					var isWestRegion = gripperContainer.hasClass('splitterWest');

					var layerX = 0;
					var layerY = 0;

					var gripperContainerSize = null;
					nzEventHelper.registerMouseDragHandler(gripper,
						// Start Drag
						function (event) {
							if (isNorthRegion || isSouthRegion) {
								gripperContainerSize = gripperContainer[0].clientHeight;
							} else if (isEastRegion || isWestRegion) {
								gripperContainerSize = gripperContainer[0].clientWidth;
							}
						},
						// Drag
						function (xDelta, yDelta) {
							var newSize = 0;
							if (isNorthRegion) {
								newSize = gripperContainerSize + yDelta - gripper[0].clientHeight;
							} else if (isSouthRegion) {
								newSize = gripperContainerSize - yDelta - gripper[0].clientHeight;
							} else if (isEastRegion) {
								newSize = gripperContainerSize - xDelta - gripper[0].clientWidth;
							} else if (isWestRegion) {
								newSize = gripperContainerSize + xDelta - gripper[0].clientWidth;
							}
							gripperContainer.css('flex-basis', Math.max(0, newSize) + 'px');

							var unusableSpace = 0;
							if (isNorthRegion || isSouthRegion) {
								unusableSpace = $element[0].scrollHeight - $element[0].clientHeight;
							} else if (isEastRegion || isWestRegion) {
								unusableSpace = $element[0].scrollWidth - $element[0].clientWidth;
							}
							if (unusableSpace > 0) {
								gripperContainer.css('flex-basis', Math.max(0, newSize - unusableSpace) + 'px');
							}
						},
						// End Drag
						function (event) {
							gripperContainerSize = null;
						},
						0
					);
				}

				var gripper = angular.element('<div class="splitterResizer" draggable="true"></div>');

				var firstChild = angular.element(children[0]);
				var lastChild = angular.element(children[children.length - 1]);
				if (isNorth(position)) {
					$element.addClass('splitterVerticalContainer');
					firstChild.addClass('splitterNorth');
					var thisGripper = gripper.clone();
					firstChild.append(thisGripper);
					setupResizeOnGripper(thisGripper);
				}
				if (isSouth(position)) {
					$element.addClass('splitterVerticalContainer');
					lastChild.addClass('splitterSouth');
					var thisGripper = gripper.clone();
					lastChild.append(thisGripper);
					setupResizeOnGripper(thisGripper);
				}
				if (isEast(position)) {
					$element.addClass('splitterHorizontalContainer');
					firstChild.addClass('splitterWest');
					var thisGripper = gripper.clone();
					firstChild.append(thisGripper);
					setupResizeOnGripper(thisGripper);
				}
				if (isWest(position)) {
					$element.addClass('splitterHorizontalContainer');
					lastChild.addClass('splitterEast');
					var thisGripper = gripper.clone();
					lastChild.append(thisGripper);
					setupResizeOnGripper(thisGripper);
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
