var sen2 = ee.ImageCollection("COPERNICUS/S2_SR"),
    dem = ee.Image("NASA/NASADEM_HGT/001"),
    Santo_Nino = 
    /* color: #d63000 */
    /* locked: true */
    ee.Geometry.Point([120.65600167638067, 16.49189935703434]),
    Coral_Bay_Nickel = 
    /* color: #98ff00 */
    /* locked: true */
    ee.Geometry.Point([117.42395491027833, 8.564431948664035]);

//Above are variables
    
    
    
// Add a panel
var panel = ui.Panel({style: {width:'500px', position: 'bottom-left' }});
ui.root.add(panel);


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
panel.add(ui.Label({value: 'The NDVI and Fe2+ indices are calculated from the median of the 5 least cloudy images  then being applied a cloud mask',
  style: {
    fontWeight: 'normal',
    fontSize: '15px',
    margin: '0 0 4px 0',
    color: '#000000',
    padding: '10px'
    }}));

// Adding the start date and end date
var selectStartYear = ui.Textbox({placeholder: 'Start',  value: '2020-06-01',
  style: {width: '100px'}}); 
var selectEndYear = ui.Textbox({placeholder: 'End',  value: '2020-12-31',
  style: {width: '100px'}}); 
var start_label = ui.Label('Start Date',
  {margin: '0 0 0 10px',fontSize: '12px',color: 'gray'});
var end_label = ui.Label('End Date',
  {margin: '0 0 0 70px',fontSize: '12px',color: 'gray'});

var startRange_subtext = ui.Panel([start_label, end_label],
  ui.Panel.Layout.flow('horizontal'));
var nextRow = ui.Panel([selectStartYear, selectEndYear],
  ui.Panel.Layout.flow('horizontal'));
panel.add(startRange_subtext).add(nextRow);


var startDate = selectStartYear.getValue();
var endDate = selectEndYear.getValue();



// Create a drop-down list to select Area of Interest(AOI)
var aoiSelect = ui.Select({
  items : [ 
    // ee.Geometry.Point([lon, lat])
    {label:'Santo Nino', value : ee.Geometry.Point([120.656, 16.4919])}, 
    {label:'Coral Bay Nickel', value : ee.Geometry.Point([117.424, 8.564])}
    ],
  onChange : function(value){
    Map.clear(); // Remove any layer left for the other locations
    print(startDate,endDate)
    // DEM
    var dem_ = ee.Image(dem.select('elevation')); 
    //Set parameters
    var para_dem = {
      bands : 'elevation',
      min : 0,
      max : 3500,
      palette: ['0000ff', '00ffff', 'ffff00', 'ff0000', 'ffffff']
    };
    // Add to map
    Map.addLayer(dem_.updateMask(dem_.gt(0)), para_dem, 'DEM');


    //Sentinel-2 median
    var sen2_median = sen2.filterBounds(value)
    .filterDate(startDate,endDate)
    .sort('CLOUDY_PIXEL_PERCENTAGE')  // Sort from the least cloudy images
    .limit(5) // then calculate the median of the 5 least cloudy image
    .reduce(ee.Reducer.median());
    

    // Select the cloud precentage band from sentinel-2 and set 40% as the limit
    var sen2_mask = sen2_median.select(['MSK_CLDPRB_median']).lte(40);

    // Mask out the sea and calculate a NDVI indices
    var sen2_ndvi = sen2_median.updateMask(dem_.gt(0))
      .updateMask(sen2_mask.gt(0))
      .normalizedDifference(['B5_median', 'B4_median']);

    Map.addLayer(sen2_ndvi, {'min': 0, 'max': 1},'NDVI');
    
    
    // Ferric iron, Fe2+ Index
    var sen2_fe = sen2_median.expression('swir / nir + g / r',{
      'swir' : sen2_median.select('B12_median'),
      'nir' : sen2_median.select('B8_median'),
      'g' : sen2_median.select('B3_median'),
      'r' : sen2_median.select('B4_median')});
      
    sen2_fe = sen2_fe.updateMask(dem_.gt(0)).updateMask(sen2_mask.gt(0));
    Map.addLayer(sen2_fe, {'min':0.3, 'max':4}, 'Fe2+');
    
    
    Map.centerObject(value, 16)
  }});

panel.widgets().insert(1, aoiSelect); // Add the AOI list to panel at index 2

