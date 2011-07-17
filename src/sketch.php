<?php
/*
 * Sketch - A simple collaborative vector graphics editor for eyeOS 2.x
 * Copyright (C) 2011  Florian Wohlfart
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


abstract class SketchApplication extends EyeosApplicationExecutable {
  public static function __run(AppExecutionContext $context, MMapResponse $response) {
	$appdir = EYE_ROOT . '/' . APPS_DIR . '/sketch/';
	$buffer = '';
	
	$includeFiles = Array(
	                      // Internal Components
	                      'classes/UndoStack.js',
	                      'classes/ImportExport.js',
	                      'classes/Controller.js',
	                      
	                      // Menu & Toolbar
	                      'classes/Actions.js',
	                      'classes/MenuItems.js',
	                      'classes/ToolbarItems.js',
	                      'classes/LeftbarItems.js',
	                      
	                      // SVG library
	                      'lib/svg/behavior/Draggable.js',
	                      'lib/svg/coords/Convert.js',
	                      'lib/svg/coords/MPreserveAspectRatio.js',
	                      'lib/svg/coords/MTransform.js',
	                      'lib/svg/coords/MViewBox.js',
	                      'lib/svg/coords/transform/Transformation.js',
	                      'lib/svg/coords/transform/Matrix.js',
	                      'lib/svg/coords/transform/Rotate.js',
	                      'lib/svg/coords/transform/Scale.js',
	                      'lib/svg/coords/transform/Skew.js',
	                      'lib/svg/coords/transform/TransformList.js',
	                      'lib/svg/coords/transform/Translate.js',
	                      'lib/svg/core/dom/MElement.js',
	                      'lib/svg/core/dom/MLocatable.js',
	                      'lib/svg/core/MTitleDescription.js',
	                      'lib/svg/core/Assert.js',
	                      'lib/svg/core/Element.js',
	                      'lib/svg/core/MHref.js',
	                      'lib/svg/core/MTextContainer.js',
	                      'lib/svg/core/Types.js',
	                      'lib/svg/embed/Svg.js',
	                      'lib/svg/paint/MFillProperties.js',
	                      'lib/svg/paint/MStrokeProperties.js',
	                      'lib/svg/paint/Marker.js',
	                      'lib/svg/paint/MMarkerProperties.js',
	                      'lib/svg/paint/Pattern.js',
	                      'lib/svg/path/dom/MPathElement.js',
	                      'lib/svg/path/PathData.js',
	                      'lib/svg/path/Path.js',
	                      'lib/svg/shape/Circle.js',
	                      'lib/svg/shape/Ellipse.js',
	                      'lib/svg/shape/Line.js',
	                      'lib/svg/shape/Polygon.js',
	                      'lib/svg/shape/Polyline.js',
	                      'lib/svg/shape/Rect.js',
	                      'lib/svg/struct/dom/MSvgElement.js',
	                      'lib/svg/struct/Defs.js',
	                      'lib/svg/struct/Desc.js',
	                      'lib/svg/struct/Group.js',
	                      'lib/svg/struct/Image.js',
	                      'lib/svg/struct/Svg.js',
	                      'lib/svg/struct/Symbol.js',
	                      'lib/svg/struct/Title.js',
	                      'lib/svg/struct/Use.js',
	                      'lib/svg/test/core/MHref.js',
	                      'lib/svg/text/MFontProperties.js',
	                      'lib/svg/text/MTextAlignment.js',
	                      'lib/svg/text/MTextDecoration.js',
	                      'lib/svg/text/MTextLayout.js',
	                      'lib/svg/text/MTextSpacing.js',
	                      'lib/svg/text/Text.js',
	                      'lib/svg/text/Tspan.js');
	
	foreach ($includeFiles as $file) {
	  $buffer .= file_get_contents($appdir . $file);
	}
	
	$response->appendToBody($buffer);
  }
  
  // export as PNG, PDF, etc. file.
  public static function exportToFile($params)
  {
	$filename = $params[0];
	$svgString = str_replace("\"", "\\\"", $params[1]);
	
	$destFile = FSI::getFile($filename);
	$destFile->checkWritePermission();
	$destFile = $destFile->getRealFile();
	$destFileName = $destFile->getPath();
	
    $command = 'echo "'. $svgString .'" | convert - ' . $destFileName;
    error_log($command);
    shell_exec($command);
    
    return true;
  }
}


?>
