Splitter
========

Resizable Region Splitter using FlexBox

Angular Module: net.enzey.splitter
Directive Name: nzSplitter

Live Example: http://EnzeyNet.github.io/Splitter

### Directive Parameters

| Parameter Name | Description |
| -------------- | ----------- |
| nz-splitter | Regions to split, accepts N, S, E, W, NS, EW.

## Current limitations
* Requires JQuery.

## Example Usage
```
<div nz-splitter="EW">
  <div>
    blarg
  </div>
  <div nz-splitter="N">
	<div>
      blarg2
    </div>
	<div>
      blarg3
    </div>
  </div>
```
