var sen2 = ee.ImageCollection("COPERNICUS/S2_SR"),
    dem = ee.Image("NASA/NASADEM_HGT/001"),
    Santo_Nino = 
    /* color: #b45f42 */
    /* locked: true */
    ee.Geometry.Point([120.65613042241338, 16.491575302073585]),
    dec2015 = ee.Image("projects/ee-tailing-dams/assets/2015Dec"),
    jun2016 = ee.Image("projects/ee-tailing-dams/assets/2016Jun"),
    dec2016 = ee.Image("projects/ee-tailing-dams/assets/2016Dec"),
    jun2017 = ee.Image("projects/ee-tailing-dams/assets/2017Jun"),
    dec2017 = ee.Image("projects/ee-tailing-dams/assets/2017Dec"),
    jun2018 = ee.Image("projects/ee-tailing-dams/assets/2018Jun"),
    dec2018 = ee.Image("projects/ee-tailing-dams/assets/2018Dec"),
    jun2019 = ee.Image("projects/ee-tailing-dams/assets/2019Jun"),
    dec2019 = ee.Image("projects/ee-tailing-dams/assets/2019Dec"),
    jun2020 = ee.Image("projects/ee-tailing-dams/assets/2020Jun"),
    dec2020 = ee.Image("projects/ee-tailing-dams/assets/2020Dec"),
    jun2021 = ee.Image("projects/ee-tailing-dams/assets/2021Jun"),
    river = 
    /* color: #518fd6 */
    /* shown: false */
    /* locked: true */
    ee.Geometry.Polygon(
        [[[120.74740391466243, 16.48115043645813],
          [120.74680309984309, 16.480203936152208],
          [120.74641686174495, 16.478187463554253],
          [120.7454727241717, 16.47534790532319],
          [120.74487190935237, 16.474030994624968],
          [120.7442281791888, 16.47230253574974],
          [120.74397068712337, 16.470820987299327],
          [120.74409943315608, 16.469586354938233],
          [120.74375611040217, 16.46872210760561],
          [120.7482622215472, 16.46789901132498],
          [120.75049381944758, 16.46810478572283],
          [120.74993591997249, 16.470820987299327],
          [120.7500646660052, 16.473207920893095],
          [120.75092297288997, 16.475841744527187],
          [120.7517383644305, 16.478434379694182],
          [120.75293999406917, 16.479422041106186],
          [120.7544420311175, 16.479504345996517],
          [120.75487118455989, 16.480903523780817],
          [120.75452786180598, 16.481932324526113],
          [120.7515237877093, 16.48205578024828],
          [120.75010758134944, 16.482590754134776],
          [120.74813347551448, 16.482179235891724]]]),
    tailings = 
    /* color: #98ff00 */
    /* shown: false */
    /* locked: true */
    ee.Geometry.Polygon(
        [[[120.6550667859145, 16.491424559146285],
          [120.6550305760928, 16.491384695173842],
          [120.65500777731617, 16.49135769054271],
          [120.65498900185307, 16.4913242562322],
          [120.65497022638996, 16.491271532884742],
          [120.65495815644958, 16.491213665779586],
          [120.65495949755406, 16.49116608614679],
          [120.65497559080801, 16.49110693307346],
          [120.65499168406208, 16.491059353414425],
          [120.65500643621175, 16.491019489366785],
          [120.65503594051087, 16.490969337811258],
          [120.65507483254157, 16.490930759682797],
          [120.65512713561738, 16.490894753422662],
          [120.6551848031112, 16.49087932216623],
          [120.65524112950052, 16.490875464351948],
          [120.65531623135286, 16.49088317998044],
          [120.65539133320536, 16.49090504092623],
          [120.65545436511715, 16.490950048748005],
          [120.65549728046145, 16.49098605499787],
          [120.65554287801467, 16.491047779982058],
          [120.65556433568682, 16.491101789327086],
          [120.65558445225442, 16.491182803316352],
          [120.65558378170276, 16.491214308744023],
          [120.6555777467319, 16.491256101658372],
          [120.65556701789941, 16.491310753906294],
          [120.65554690132818, 16.49136026241244],
          [120.655529466973, 16.49139498264999],
          [120.65550532708849, 16.49142455914625],
          [120.65547582279456, 16.49145477860366],
          [120.6554382718631, 16.49148371212247],
          [120.65540072094035, 16.491506858937438],
          [120.65535780559264, 16.491517146405364],
          [120.65530013809884, 16.49152743387587],
          [120.65525588164918, 16.491524219044944],
          [120.65520626078336, 16.49150943080213],
          [120.65518010924362, 16.491495285531776],
          [120.65515127549847, 16.491482426188398],
          [120.65512445340559, 16.491469566848608],
          [120.655094949109, 16.491448991899542]]]),
    geometry = 
    /* color: #5183d6 */
    /* shown: false */
    /* locked: true */
    ee.Geometry.Polygon(
        [[[120.58553448710573, 16.636125098541473],
          [120.58587780985964, 16.4676279100408],
          [120.76200238261355, 16.467298670089345],
          [120.76131573710573, 16.636454050297605]]]),
    no_change = 
    /* color: #ffa500 */
    /* shown: false */
    /* locked: true */
    ee.Geometry.MultiPolygon(
        [[[[120.63229412214883, 16.472220111550495],
           [120.6323048509849, 16.472104365936474],
           [120.6324496902717, 16.47207092830176],
           [120.63245773689874, 16.47216866906389]]],
         [[[120.6323960460914, 16.47200662514189],
           [120.63239068167337, 16.471937177705268],
           [120.63244164364465, 16.471934605577502],
           [120.63244700806268, 16.47200662514189]]]]);

// Add a panel
var panel = ui.Panel({style: {width:'500px', position: 'bottom-left' }});
ui.root.add(panel);

// Initial parameters(default):
var aoi = ee.Geometry.Point([120.656, 16.4919]);
var index = 'DEM';


// Title
panel.add(ui.Label({value: 'Remote sensing on tailing dams',
  style: {
    fontWeight: 'normal',
    fontSize: '25px',
    margin: '0 0 4px 0',
    color: 'Blue',
    padding: '10px'
    }}));


// Adding description before the drop-down list
panel.add(ui.Label({value: 'Please select the tailing dam of interest',
  style: {
    fontWeight: 'normal',
    fontSize: '15px',
    margin: '0 0 4px 0',
    color: '#000000',
    padding: '10px'
    }}));
    
// Adding description before the date selection
panel.add(ui.Label({value: 'The indices are calculated from the median of the 5 least cloudy sentinel-2 images from the sepcified time, then applying a cloud mask and a sea mask.',
  style: {
    fontWeight: 'normal',
    fontSize: '15px',
    margin: '0 0 4px 0',
    color: '#000000',
    padding: '10px'
    }}));


  
// Select the time to be shown
var selectSeason = ui.Select({
  placeholder: 'date', // Default to be Spring
  items : [ 
    {label:'Dec 2015', value : 'dec2015'}, 
    {label:'Jun 2016', value : 'jun2016'},
    {label:'Dec 2016', value : 'dec2016'},
    {label:'Jun 2017', value : 'jun2017'},
    {label:'Dec 2017', value : 'dec2017'},
    {label:'Jun 2018', value : 'jun2018'},
    {label:'Dec 2018', value : 'dec2018'},
    {label:'Jun 2019', value : 'jun2019'},
    {label:'Dec 2019', value : 'dec2019'},
    {label:'Jun 2020', value : 'jun2020'},
    {label:'Dec 2020', value : 'dec2020'},
    {label:'Jun 2021', value : 'jun2021'},
    ]});
  
  
// Adding labels above the dates
var start_label = ui.Label('Select time',
  {margin: '0 0 0 10px',fontSize: '12px',color: 'gray'});



// Add a button to update images when pressed
var enterConfirm = ui.Button({label: 'Add layer', style: {color: 'red'},
  onClick: function(){  // Plot
    plotImage(selectSeason.getValue(), aoi, index); 
  }});


// Add the labels and the textbox and update button to panel
var nextRow = ui.Panel([selectSeason, enterConfirm],
  ui.Panel.Layout.flow('horizontal'));
panel.add(start_label).add(nextRow);




// Create a drop-down list to select Area of Interest(AOI)
var aoiSelect = ui.Select({
  placeholder: 'Santo Nino',
  items : [ 
    // ee.Geometry.Point([lon, lat])
    {label:'Santo Nino', value : ee.Geometry.Point([120.656, 16.4919])}, 
    ],
  onChange : function(value){
    Map.clear();
    aoi=value;  // Update aoi
    Map.centerObject(aoi, 16);
  }});

panel.widgets().insert(2, aoiSelect); // Add AOI list to panel at index 2 (no.3)


// A button to clear all the Layers when clicked
var clearLayer = ui.Button({
  label:'Clear Layer', 
  style: {color:'red'},
  
  onClick: function(){
    Map.clear();
  }});

panel.add(clearLayer);  // Add button to panel



// Select which index to add to map
var selectIndex = ui.Select({
  placeholder: 'DEM',
  items: [
    {label: 'true colour composute', value:'tcc'},
    {label: 'false colour composute', value:'fcc'},
    {label: 'DEM', value:'DEM'},
    {label: 'NDVI', value: 'NDVI'},
    {label: 'NDWI', value: 'NDWI'},
    {label: 'MSAVI', value:'MSAVI'},
    {label: 'BWDRVI', value:'BWDRVI'},
    ],
  onChange: function(value){
    index = value;
    
    //Change the description for indices
    if (value=='tcc'){
      indexDescription.setValue('Real colour of the Planet Scope used for indices');
    }
    if (value=='fcc'){
      indexDescription.setValue('False colour of the Planet Scope image. Red: Near Infra-red, Green: Red, Blue: Green');
    }
    if (value=='DEM'){
      indexDescription.setValue('NASA NASADEM Digital Elevation');
    }
    if (value=='NDVI'){
      indexDescription.setValue('Normalized difference vegetation index.Temperate, tropical rainforest: ≈ 1 (white). Shrub, grassland: low positive. Water: ≈	black');
    }
    if (value=='NDWI'){
      indexDescription.setValue('Normalized difference water index. Water: White.  Vegetation ≈ gray');
    }
    if (value=='MSAVI'){
      indexDescription.setValue('Modified Soil-adjusted Vegetation Index. It minimizes the effect of bare soil on the Soil Adjusted Vegetation Index');
    }
    if (value=='BWDRVI'){
      indexDescription.setValue('Blue-wide dynamic range vegetation index. Increase sensitivity to high leaf area per unit surface');
    }
  }});


// Create an empty label for later update the index description
var indexDescription = ui.Label('',{margin: '10px'});


// Add the above to panel
panel.widgets().insert(4, selectIndex);
panel.widgets().insert(5, indexDescription);

var img, para_dem;
// DEM
// Run regardless of index selection as this is for masking
var dem_ = ee.Image(dem.select('elevation')); 

// Define a function to plot image to run whenever button is pressed
var plotImage = function(date, aoi, index){
  // Set date range
  if (date == 'dec2015'){ // Change date range ramge to spring when selected
    img = dec2015;
  }
  if (date == 'jun2016'){ // Change date range ramge to spring when selected
    img = jun2016;
  }
  if (date == 'dec2016'){ // Change date range ramge to spring when selected
    img = dec2016;
  }
  if (date == 'jun2017'){ // Change date range ramge to spring when selected
    img = jun2017;
  }
  if (date == 'dec2017'){ // Change date range ramge to spring when selected
    img = dec2015;
  }
  if (date == 'jun2018'){ // Change date range ramge to spring when selected
    img = jun2018;
  }
  if (date == 'dec2018'){ // Change date range ramge to spring when selected
    img = dec2015;
  }
  if (date == 'jun2019'){ // Change date range ramge to spring when selected
    img = jun2019;
  }
  if (date == 'dec2019'){ // Change date range ramge to spring when selected
    img = dec2015;
  }
  if (date == 'jun2020'){ // Change date range ramge to spring when selected
    img = jun2020;
  }
  if (date == 'dec2020'){ // Change date range ramge to spring when selected
    img = dec2020;
  }
  if (date == 'jun2021'){ // Change date range ramge to spring when selected
    img = jun2021;
  }


  // conditions for different selection
  if (index == 'tcc'){
    para_dem = {
      bands : ["b3","b2","b1"],
      min : 100,
      max : 2000,
    };
    // Add layer if index is selected 
    Map.addLayer(img.updateMask(dem_.gt(0)), para_dem, 'true colour composute '+ date);
  }
  
  if (index == 'fcc'){
    para_dem = {
      bands : ["b4","b3","b2"],
      min : 100,
      max : 4500,
    };
    Map.addLayer(img.updateMask(dem_.gt(0)), para_dem, 'false colour composute '+ date);
  }
  

  if (index == 'DEM'){
    //Set parameters
    para_dem = {
      bands : 'elevation',
      min : 0,
      max : 3500,
      palette: ['0000ff', '00ffff', 'ffff00', 'ff0000', 'ffffff']
    };
    // Add to map
    Map.addLayer(dem_.updateMask(dem_.gt(0)), para_dem, 'DEM ');
    }
  
  if (index == 'NDWI'){
    // Mask out the sea and calculate a NDWI indices
    var NDWI = img.updateMask(dem_.gt(0))
      .normalizedDifference(["b2", "b4"]);

    Map.addLayer(NDWI, {min: -0.7, max: 0.4},'NDWI ' + date);
  }
  
  if (index == 'NDVI'){
    // Mask out the sea and calculate a NDVI indices
    var NDVI = img.updateMask(dem_.gt(0))
      .normalizedDifference(["b4", "b3"]);

    Map.addLayer(NDVI, {min: -0.2, max: 0.8},'NDVI ' + date);
  }
  
  if (index == 'MSAVI'){
    // Adjusted transformed soil-adjusted VI  (MSAVI)
    var MSAVI = img.select("b4").multiply(2).add(1)
    .subtract(img.select("b4").multiply(2).add(1).pow(2)
    .subtract(img.select("b4")
    .subtract(img.select("b3")).multiply(8)).sqrt()
    ).divide(2);
    
    MSAVI = MSAVI.updateMask(dem_.gt(0));
    Map.addLayer(MSAVI, {min: -0.5, max: 0.9},'MSAVI ' + date);
  }
    
    if (index == 'BWDRVI'){
    // Adjusted transformed soil-adjusted VI  (MSAVI)
    var BWDRVI = img.expression('(0.1 * B08 - B02) / (0.1 * B08 + B02)',
    {'B02' : img.select("b1"),
    'B08' : img.select("b4")});
    
    BWDRVI = BWDRVI.updateMask(dem_.gt(0));
    Map.addLayer(BWDRVI, {min: -0.9, max: 0.2}, 'BWDRVI '+ date);
  }
  
  Map.centerObject(aoi, 16);
};


// Define a palatte to show colours
// red: negative, decreased.  green: positive, increeased
var paletteChange = [
'7f0000', 'ff0000', 'ff6666', 'ffb2b2', 'ffe5e5', 'ffffff',
'e5f2e5', '99cc99', '4ca64c', '008000', '005900'
];


// Define a function to get NDVI as a band to image
var addNDVI = function(image) {
  var ndvi_ = image.normalizedDifference(['b4', 'b3']).rename('NDVI');
  return image.addBands(ndvi_);
  // imageNDVI.set('system:index',image.get('system:index'));
};

// Define a function to add NDWI as a band to image
var addNDWI = function(image) {
  var ndwi_ = image.normalizedDifference(["b2", "b4"]).rename('NDWI');
  return image.addBands(ndwi_);
  // imageNDWI.set('system:time_start',image.get('system:time_start'));
};


// pImageCollection for all Planet Scope imagery
var planetCollection = ee.ImageCollection([
  jun2016, dec2016, jun2017, dec2017, jun2018, dec2018,
  jun2019, dec2019, jun2020, dec2020, jun2021
  ]);

// Collection for June basemaps only (for selecting what month to show)
var junCollection = ee.ImageCollection([
  jun2016, jun2017, jun2018, jun2019, jun2020, jun2021
  ]);

// Collection for December basemaps only(for selecting what month to show)
var decCollection = ee.ImageCollection([
  dec2015, dec2016, dec2017, dec2018, dec2019, dec2020, 
  ]);

// Update all collections for new bands (3 collections x 2 bands)
planetCollection = planetCollection.map(addNDVI);
planetCollection = planetCollection.map(addNDWI);
junCollection = junCollection.map(addNDVI);
junCollection = junCollection.map(addNDWI);
decCollection = decCollection.map(addNDVI);
decCollection = decCollection.map(addNDWI);

dec2015 = addNDVI(dec2015);
dec2015 = addNDWI(dec2015);

// A drop down list for selecting months to shown on chart
var chooseTime = ui.Select({
  placeholder: 'all dates', // default to all time
  items : [ 
    {label:'all time', value : 'all'}, 
    {label:'June only', value : 'jun'},
    {label:'December only', value : 'dec'},
    ]});

// A button to update the chart with new selected season
var updateChart = ui.Button({
  label:'Update chart', 
  style: {color:'red'},
  
  onClick: function(){  // When click
  // Change variable 'selectCollection'to the correct collections (3 options hence for loop x3)
  // var 'selectCollection' is used in the function defined below to plot chart
  if (chooseTime.getValue() == 'all'){
    selectCollection = planetCollection;
  }
  if (chooseTime.getValue() == 'jun'){
    selectCollection = junCollection;
  }
  if (chooseTime.getValue() == 'dec'){
    selectCollection = decCollection;
  }
  // ((Maybe there's a better way to update chart but I couldn't find it
  panel.remove(chartSanto);   // Remove the old chart x2
  panel.remove(chartRiver);
  chartSanto = plotSanto();   // Call function to plot new chart x2 (Variables declare after)
  chartRiver = plotRiver();
  panel.add(chartSanto);      // Add new chart to panel x2
  panel.add(chartRiver);
  }});
  
// Add a label to explain the charts
var chartExplains = panel.add(ui.Label({value: 'Please select your preferenced time of image to be shown before drawing Region of Interest. red: decreased.  green: increeased',
  style: {
    fontWeight: 'normal',
    fontSize: '15px',
    margin: '0 0 4px 0',
    color: 'black',
    padding: '10px'
    }}));


// Add the select and update chart button to panel, same row
var chartRow = ui.Panel([chooseTime, updateChart],
  ui.Panel.Layout.flow('horizontal'));  // To make two buttons the same row
panel.add(chartRow);


// Define a function to plot Santo Nino's chart
var plotSanto = function(){
  var plotSanto_ =
      ui.Chart.image
          .series({
            imageCollection: selectCollection.select(['NDVI', 'NDWI']),
            region: tailings,
            reducer: ee.Reducer.mean(),
            scale: 5,
            xProperty: 'date'   // I saved the date properties manually beforehand
          })
          .setSeriesNames(['NDVI', 'NDWI'])
          .setOptions({
            title: 'Santo Nino Tailings Dams Average NDVI & NDWI Index Value',
            hAxis: {title: 'Date (YYYY-MM)', titleTextStyle: {italic: false, bold: true}},
            vAxis: {
              title: 'Indices',
              titleTextStyle: {italic: false, bold: true}
            },
            lineWidth: 8,
            colors: ['navy', 'green'],
            curveType: 'function'
          });
  return (plotSanto_); // Return the new plot
};


// Funtion to plot the chart for river
var plotRiver = function(){
  var plotRiver_ =
      ui.Chart.image
          .series({
            imageCollection: selectCollection.select(['NDVI', 'NDWI']),
            region: river,
            reducer: ee.Reducer.mean(),
            scale: 5,
            xProperty: 'date'
          })
          .setSeriesNames(['NDVI', 'NDWI'])
          .setOptions({
            title: 'Agno River NDVI & NDWI Index Value',
            hAxis: {title: 'Date (YYYY-MM)', titleTextStyle: {italic: false, bold: true}},
            vAxis: {
              title: 'Indices',
              titleTextStyle: {italic: false, bold: true}
            },
            lineWidth: 8,
            colors: ['navy', 'green'],
            curveType: 'function'
          });
  return (plotRiver_);
};




// Chart default to be 'all time'
var selectCollection = planetCollection;
var chartSanto = plotSanto();
var chartRiver = plotRiver();
panel.add(chartSanto);
panel.add(chartRiver);



var drawingTools = Map.drawingTools();  // Abbreviation
drawingTools.setDrawModes(["polygon"]);   // Only allow to draw polygon
drawingTools.addLayer([], "roi", "orange");   // Add them to the ROI layer
drawingTools.setShape("polygon"); 
drawingTools.draw(); //Drawing mode

var chart;   // Declare variable outside function to make it global

// I referenced the code below from a Chinese blog and adjust some of the code
// https://developers.google.com/earth-engine/guides/ui_widgets also has examples on how to use it
var plotROI = ui.util.debounce(function(geom, layer, widget) { 
  // geom, layer, widget are callback from onEdit, onDraw, onErase
  // geom: the edited ee.Geometry
  // layer: the GeometryLayer to which the edited geometry belongs
  // widget: the ui.Map.DrawingTools widget that the event listener is bound to.
  panel.remove(chart); 
  var polygons = layer.toGeometry(); 
  chart = ui.Chart.image.series({ 
    imageCollection: selectCollection.select(['NDVI', 'NDWI']), 
    region: polygons, 
    reducer: ee.Reducer.mean(), 
    scale: 5,
    xProperty: 'date'
  })
  .setSeriesNames(['NDVI', 'NDWI'])
  .setOptions({
    title: 'ROI average NDVI and NDWI',
    hAxis: {title: 'Date (YYYY-MM)', titleTextStyle: {italic: false, bold: true}},
    vAxis: {
      title: 'Indices',
      titleTextStyle: {italic: false, bold: true}
    },
    lineWidth: 8,
    colors: ['navy', 'green'],
    curveType: 'function'
  });
  
  panel.add(chart); 
}, 500); 


// Call function whenever ROI is changed
drawingTools.onEdit(plotROI); 
drawingTools.onDraw(plotROI); 
drawingTools.onErase(plotROI); 

Map.centerObject(ee.Geometry.Point([120.656, 16.4919]), 16);

// Define a palatte to show colours
// red: negative, decreased.  green: positive, increeased
var paletteChange = [
'7f0000', 'ff0000', 'ff6666', 'ffb2b2', 'ffe5e5', 'ffffff',
'e5f2e5', '99cc99', '4ca64c', '008000', '005900'
];


var diffNDVI = function(image){
  return image.select(['NDVI']).subtract(dec2015.select(['NDVI']));
};

var diffNDWI = function(image){
  return image.select(['NDWI']).subtract(dec2015.select(['NDWI']));
};


// Making timelapse video
// Reference: https://code.earthengine.google.com/de742ed3d29179ea591712428c55a3a7


var text = require('users/gena/packages:text');    //Import package from reference


    // NDVI video
var ndvi_video = planetCollection.select(['NDVI','NDWI']).map(function(image){
  var label = image.get('date');  // I saved the date property beforehand into the image
  var water_mask = (image.select('NDWI').lte(-0.3));
  var mosaic = ee.ImageCollection([
  water_mask.visualize({palette: 'blue'}),
  diffNDVI(image).updateMask(water_mask.gt(0)).visualize({min: -0.4, max: 0.4, palette: paletteChange}),
]).mosaic();

  return mosaic.visualize({
    forceRgbOutput: true,
  }).clip(geometry).set({label: label}); //adding a property named label into the vid collection
});


// annotate  Adding label to the vid
var annotations = [
  {
    position: 'left', offset: '1%', margin: '1%', property: 'label', scale: Map.getScale() * 2
  }
];

// Update image with label
ndvi_video = ndvi_video.map(function(image) {
  return text.annotateImage(image, {}, geometry, annotations);
});


// Define properties for the video
var gifParams = {
  'region': geometry,
  'dimensions': 600,
  'crs': 'EPSG:3857',
  'framesPerSecond': 2
};

print(ndvi_video.getVideoThumbURL(gifParams));  // Print out url to view and download


    // NDWI video
var ndwi_video = planetCollection.select(['NDWI']).map(function(image){
  var label = image.get('date');  // I saved the date property beforehand into the image
  var water_mask = (image.select('NDWI').lte(-0.3));
  var mosaic = ee.ImageCollection([
  water_mask.visualize({palette: 'blue'}),
  diffNDWI(image).updateMask(water_mask.gt(0)).visualize({min: -0.4, max: 0.4, palette: paletteChange}),
]).mosaic();

  return mosaic.visualize({
    forceRgbOutput: true,
  }).clip(geometry).set({label: label}); //adding a property named label into the vid collection
});



ndwi_video = ndwi_video.map(function(image) {
  return text.annotateImage(image, {}, geometry, annotations);
});

print(ndwi_video.getVideoThumbURL(gifParams)); // Print out url to view and download



// Add the variation video to the map
// Reference https://code.earthengine.google.com/6270df443326ec0d90a18838bd91c5a5
var animation = require('users/gena/packages:animation');
animation.animate(ndvi_video, {maxFrames: 10});
