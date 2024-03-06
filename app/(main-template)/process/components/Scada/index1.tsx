"use client";
import { PureComponent, ReactNode } from "react";

import { GlgToolkit } from "./GlgToolkit";

const getScript = (src: string) => {
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  script.defer = true;
  script.crossOrigin = "anonymous";
  return script;
};

//////////////////////////////////////////////////////////////////////////////
function Debug(message: string, debug: boolean) {
  if (debug) console.log(message);
}

//////////////////////////////////////////////////////////////////////////////
function AppError(message: string) {
  console.error(message);
}

//////////////////////////////////////////////////////////////////////////////
function AppAlert(message: string) {
  window.alert(message);
}

interface Props {
  id: string;
  urlFile: string;
  data_init: Array<any>;
  updateData: () => void;
  data_update: object;
}

class Scada extends PureComponent<Props, {}> {
  USE_TAGS: boolean;
  USE_ACTIONS: boolean;
  UPDATE_INTERVAL: number;
  SolventValve: number;
  SteamValve: number;
  CoolingValve: number;
  WaterValve: number;
  GLG: any;
  viewport: any;
  DEBUG: boolean;
  counter: number;
  UpdateTimer: NodeJS.Timeout | null;
  CoordScale: number;
  TextScale: number;

  constructor(props: Props) {
    super(props);

    /* Demonstrates updating the drawing using either tags (true) or 
        resources (false).
      */
    this.USE_TAGS = true;

    /* Demonstrates two ways of processing user clicks on objects:
        - processing actions attached to objects in the input callback (true), or 
        - using simple selection via object names in the selection callback (false).
      */
    this.USE_ACTIONS = false;

    // Graphics update interval.
    this.UPDATE_INTERVAL = 100; // msec

    this.SolventValve = 0.85;
    this.SteamValve = 1.0;
    this.CoolingValve = 0.8;
    this.WaterValve = 0.4;
      // Enable debuginng/diagnostics information.
    this.DEBUG = false;
    this.UpdateTimer = null;
    this.counter = 0;
    this.CoordScale = 1;
    this.TextScale = 1;
  }

  componentDidMount(): void {
    document.body.appendChild(getScript("./scada/gunzip.min.js"));
    this.initialization();
  }

  initialization = () => {
    // Get a handle to the GLG Toolkit library.
    this.GLG = new GlgToolkit();
    // Debugging aid: uncomment the next line to throw an exception on a GLG error.
    this.GLG.ThrowExceptionOnError(true, true, true);

    // Set initial size of the drawing.
    this.SetDrawingSize(false);

    // Increase canvas resolution for mobile devices.
    this.SetCanvasResolution();

    /* Loads misc. assets used by the program and invokes the LoadDrawing function
        when done.
      */
    this.LoadAssets(this.LoadDrawing, null);
  };

  //////////////////////////////////////////////////////////////////////////////
  // Changes drawing size while maintaining width/height aspect ratio.
  //////////////////////////////////////////////////////////////////////////////
  SetDrawingSize = (next_size: boolean) => {
    const { id } = this.props;
    const ASPECT_RATIO = 3840 / 2160;

    // Settings for desktop displays.
    const MIN_WIDTH = 600;
    const MAX_WIDTH = 1422;
    const SCROLLBAR_WIDTH = 15;

    if (this.SetDrawingSize.size_index == undefined) {
      // first time
      this.SetDrawingSize.size_index = 0;

      this.SetDrawingSize.small_sizes = [1, 1.5, 2, 2.5];
      this.SetDrawingSize.medium_sizes = [1, 0.75, 1.25, 1.5];
      this.SetDrawingSize.large_sizes = [1, 0.6, 1.25, 1.5];
      this.SetDrawingSize.num_sizes = this.SetDrawingSize.small_sizes.length;
      this.SetDrawingSize.is_mobile = screen.width <= 760;

      window.addEventListener("resize", () => this.SetDrawingSize(false));
    } else if (next_size) {
      ++this.SetDrawingSize.size_index;
      this.SetDrawingSize.size_index %= this.SetDrawingSize.num_sizes;
    }

    var drawing_area = document.getElementById(id);
    if (this.SetDrawingSize.is_mobile) {
      /* Mobile devices use constant device-width, adjust only the height 
          of the drawing to keep the aspect ratio.
      */
      drawing_area.style.height =
        "" + Math.trunc(drawing_area.clientWidth / ASPECT_RATIO) + "px";
    } /* Desktop */ else {
      var span = document.body.clientWidth;
      span -= SCROLLBAR_WIDTH;

      var start_width;
      if (span < MIN_WIDTH) start_width = MIN_WIDTH;
      else if (span > MAX_WIDTH) start_width = MAX_WIDTH;
      else start_width = span;

      var size_array;
      if (span < 600) size_array = this.SetDrawingSize.small_sizes;
      else if (span < 800) size_array = this.SetDrawingSize.medium_sizes;
      else size_array = this.SetDrawingSize.large_sizes;

      var size_coeff = size_array[this.SetDrawingSize.size_index];
      var width = Math.trunc(Math.max(start_width * size_coeff, MIN_WIDTH));

      drawing_area.style.width = "" + width + "px";
      drawing_area.style.height = "" + Math.trunc(width / ASPECT_RATIO) + "px";
    }
  };

  SetCanvasResolution = () => {
    // Set canvas resolution only for mobile devices with devicePixelRatio != 1.
    if (window.devicePixelRatio == 1 || !this.SetDrawingSize.is_mobile) return; // Use coord scale = 1.0 for desktop.

    /* The first parameter defines canvas coordinate scaling with values 
        between 1 and devicePixelRatio. Values greater than 1 increase 
        canvas resolution and result in sharper rendering. The value of 
        devicePixelRatio may be used for very crisp rendering with very thin 
        lines.
        
        Canvas scale > 1 makes text smaller, and the second parameter defines
        the text scaling factor used to increase text size.
        
        The third parameter defines the scaling factor that is used to
        scale down text in native widgets (such as native buttons, toggles, etc.)
        to match the scale of the drawing.
    */
    this.CoordScale = 2.0;
    this.TextScale = 1.5;
    var native_widget_text_scale = 0.6;
    this.GLG.SetCanvasScale(
      this.CoordScale,
      this.TextScale,
      native_widget_text_scale
    );

    // Mobile devices use fixed device-width: disable Change Drawing Size button.
    var change_size_button = document.getElementById("change_size");
    if (change_size_button != null)
      change_size_button.parentNode.removeChild(change_size_button);
  };

  //////////////////////////////////////////////////////////////////////////////
  AssetLoaded = (glg_object: any, data: any, path: string) => {
    if (data.name == "scrollbar_h") {
      if (glg_object != null)
        glg_object.SetResourceObject("$config/GlgHScrollbar", glg_object);
    } else if (data.name == "scrollbar_v") {
      if (glg_object != null)
        glg_object.SetResourceObject("$config/GlgVScrollbar", glg_object);
    } else console.error("Unexpected asset name");

    /* Define an internal variable to keep the number of loaded assets. */
    if (this.AssetLoaded.num_loaded == undefined)
      this.AssetLoaded.num_loaded = 1;
    else ++this.AssetLoaded.num_loaded;

    // Invoke the callback after all assets have been loaded.
    if (this.AssetLoaded.num_loaded == 2) data.callback();
  };

  //////////////////////////////////////////////////////////////////////////////
  // Loads any assets required by the application and invokes the specified
  // callback when done.
  // Alternatively, the application's drawing can be loaded as an asset here
  // as well, so that it starts loading without waiting for other assets to
  // finish loading.
  //////////////////////////////////////////////////////////////////////////////
  LoadAssets = (callback: () => void, user_data: any) => {
    /* HTML5 doesn't provide a scrollbar input element (only a range input 
      html element is available). This application needs to load GLG scrollbars
      used for integrated chart scrolling. For each loaded scrollbar, the 
      AssetLoaded callback is invoked with the supplied data.
    */
    this.GLG.LoadWidgetFromURL("scada/scrollbar_h.g", null, this.AssetLoaded, {
      name: "scrollbar_h",
      callback: callback,
      user_data: user_data,
    });
    this.GLG.LoadWidgetFromURL("scada/scrollbar_v.g", null, this.AssetLoaded, {
      name: "scrollbar_v",
      callback: callback,
      user_data: user_data,
    });
  };

  //////////////////////////////////////////////////////////////////////////////
  LoadDrawing = () => {
    const { urlFile } = this.props;
    /* Load a drawing from the process.g file. 
      The LoadCB callback will be invoked when the drawing has been loaded.
    */
    this.GLG.LoadWidgetFromURL(urlFile, null, this.LoadCB, null);
  };

  //////////////////////////////////////////////////////////////////////////////
  LoadCB = (drawing: any, data: any, path: string) => {
    const { id } = this.props;
    if (drawing == null) {
      AppAlert("Can't load drawing, check console message for details.");
      return;
    }

    var loader = document.getElementById(`${id}-container`);
    if (loader) loader.parentNode.removeChild(loader);

    // Define the element in the HTML page to display the drawing in.
    drawing.SetParentElement(id);

    // Disable viewport border to use the border of the glg_area.
    drawing.SetDResource("LineWidth", 0);

    this.StartGlg(drawing);
  };

  //////////////////////////////////////////////////////////////////////////////
  StartGlg = (drawing: any) => {
    this.viewport = drawing;

    // Initialization before hierarchy setup.
    this.InitBeforeDrawing();

    // Setup object hierarchy in the drawing.
    this.viewport.SetupHierarchy();

    // Initialization after hierarchy setup.
    this.InitAfterDrawing();

    // Start dynamic updates.
    this.StartUpdateTimer();

    // Display the drawing in a web page.
    this.viewport.Update();
  };

  //////////////////////////////////////////////////////////////////////////////
  InitBeforeDrawing = () => {
    const { data_init } = this.props;

    this.viewport.AddListener(
      this.GLG.GlgCallbackType.INPUT_CB,
      this.InputCallback
    );
    this.viewport.AddListener(
      this.GLG.GlgCallbackType.SELECT_CB,
      this.SelectCallback
    );

    data_init.map((item) => {
      this.viewport.SetDResource(item.label, item.value);
    });

    // Set initial patameters as needed.
    // Viewport.SetDResource( "DialPressure/Low", 0.0 );
    // Viewport.SetDResource( "DialVoltage/Low", 0.0 );
    // Viewport.SetDResource( "DialAmps/Low", 0.0 );
    // Viewport.SetDResource( "SliderPressure/Low", 0.0 );

    // Viewport.SetDResource( "DialPressure/High", 50.0 );
    // Viewport.SetDResource( "DialVoltage/High", 120.0 );
    // Viewport.SetDResource( "DialAmps/High", 10.0 );
    // Viewport.SetDResource( "SliderPressure/High", 50.0 );

    // // If the drawing contains a QuitButton, make it invisible.
    // if( Viewport.HasResourceObject( "QuitButton" ) )
    // Viewport.SetDResource( "QuitButton/Visibility", 0 );
  };

  //////////////////////////////////////////////////////////////////////////////
  // Initialization after hierarchy setup.
  //////////////////////////////////////////////////////////////////////////////
  InitAfterDrawing = () => {
    // Place application specific code here as needed.
  };

  //////////////////////////////////////////////////////////////////////////
  StartUpdateTimer = () => {
    this.UpdateTimer = setTimeout(this.UpdateDrawing, this.UPDATE_INTERVAL);
  };

  //////////////////////////////////////////////////////////////////////////////
  // Animation: obtain new data and push the new values to graphics.
  //////////////////////////////////////////////////////////////////////////////
  UpdateDrawing = () => {
    /* Obtain simulated demo data values in a specified range.
            The application should provide a custom implementation
            of the data acquisition interface to obtain real-time
            data values.
        */
    var voltage = this.GetData(0.0, 120.0);
    var current = this.GetData(0.0, 10.0);

    if (this.USE_TAGS) {
      // Use tags for animation.
      // Push values to the objects using tags defined in the drawing.
      this.viewport.SetDTag("Voltage", voltage, /*if_changed*/ true);
      this.viewport.SetDTag("Current", current, /*if_changed*/ true);
    } // Use resources for animation.
    else {
      // Push values to the objects using resource paths.
      this.viewport.SetDResourceIf(
        "DialVoltage/Value",
        voltage,
        /*if_changed*/ true
      );
      this.viewport.SetDResourceIf(
        "DialAmps/Value",
        current,
        /*if_changed*/ true
      );
    }

    // Refresh display.
    this.viewport.Update();

    // Restart the update timer.
    this.StartUpdateTimer();
  };

  //////////////////////////////////////////////////////////////////////////////
  GetData = (/*double*/ low: number, /*double*/ high: number) => {
    var half_amplitude, center, period, value, alpha;

    half_amplitude = (high - low) / 2.0;
    center = low + half_amplitude;

    period = 100.0;
    alpha = (2.0 * Math.PI * this.counter) / period;

    value = center + half_amplitude * Math.sin(alpha) * Math.sin(alpha / 30.0);

    ++this.counter;
    return value;
  };

  //////////////////////////////////////////////////////////////////////////////
  // Handle user interaction as needed.
  //////////////////////////////////////////////////////////////////////////////
  InputCallback = (/*GlgObject*/ viewport: any, /*GlgObject*/ message_obj: any) => {
    var origin = message_obj.GetSResource("Origin");
    var format = message_obj.GetSResource("Format");
    var action = message_obj.GetSResource("Action");

    // Handle events from a GLG Button widget.
    if (format == "Button") {
      if (action == "Activate") {
        //Push button events.
        // Place code here to handle push button events.
      } else if (action == "ValueChanged") {
        //Toggle button events.
        if (origin == "StartButton") {
          var value = message_obj.GetDResource("OnState");
          switch (value) {
            case 0:
              this.StopUpdateTimer();
              break;
            case 1:
              this.StartUpdateTimer();
              break;
            default:
              break;
          }
        }
      }

      // Refresh display.
      viewport.Update();
    }

    // Input occurred in a slider named SliderPressure.
    else if (format == "Slider" && origin == "SliderPressure") {
      // Retrieve current slider value from the message object.
      var slider_value = message_obj.GetDResource("ValueY");

      // Set a data value for a dial control DialPressure.
      viewport.SetDResource("DialPressure/Value", slider_value);
      viewport.Update();
    }
  };

  //////////////////////////////////////////////////////////////////////////
  StopUpdateTimer = () => {
    if (this.UpdateTimer != null) {
      clearTimeout(this.UpdateTimer);
      this.UpdateTimer = null;
    }
  };

  //////////////////////////////////////////////////////////////////////////////
  // SIMULATION ONLY
  //////////////////////////////////////////////////////////////////////////////
  PutInRange = (variable: number, low: number, high: number) => {
    if (variable < low) return low;
    else if (variable > high) return high;
    else return variable;
  };

  //////////////////////////////////////////////////////////////////////////////
  // Selection callback that may be used as an alternative way to handle
  // mouse selection, such open or close valves on a mouse click, by
  // processing names of objects selected by the mouse click.
  //
  // InputCallback uses a more elaborate alternative that handles custom
  // actions attached to objects in the drawing, which does not rely
  // on object names.
  //////////////////////////////////////////////////////////////////////////////
  SelectCallback = (vp: any, name_array: any, button: number) => {
    var visibility, increment;
    var name;

    /* If USE_ACTIONS=true, Input callback is used to process user clicks
      via actions attached to objects, instead of using the Select callback.
    */
    if (this.USE_ACTIONS) return;

    // Process user clicks on objects using simple selection via object names.
    if (name_array == null) return;

    if (button == 1) increment = 1.0;
    else increment = -1.0;

    for (var i = 0; (name = name_array[i]) != null; ++i) {
      if (name == "SolventValve") {
        this.SolventValve += 0.2 * increment;
        this.SolventValve = this.PutInRange(this.SolventValve, 0.0, 1.0);
        this.viewport.SetDResource("SolventValve/Value", this.SolventValve);
        break;
      } else if (name == "SteamValve") {
        this.SteamValve += 0.2 * increment;
        this.SteamValve = this.PutInRange(this.SteamValve, 0.0, 1.0);
        this.viewport.SetDResource("SteamValve/Value", this.SteamValve);
        break;
      } else if (name == "CoolingValve") {
        this.CoolingValve += 0.2 * increment;
        this.CoolingValve = this.PutInRange(this.CoolingValve, 0.0, 1.0);
        this.viewport.SetDResource("CoolingValve/Value", this.CoolingValve);
        break;
      } else if (name == "WaterValve") {
        this.WaterValve += 0.2 * increment;
        this.WaterValve = this.PutInRange(this.WaterValve, 0.0, 1.0);
        this.viewport.SetDResource("WaterValve/Value", this.WaterValve);
        break;
      } else if (
        name.indexOf("Heater") == 0 ||
        name.indexOf("PressureGauge") == 0
      ) {
        visibility = this.viewport.GetDResource("PressureGauge/Visibility");
        this.viewport.SetDResource(
          "PressureGauge/Visibility",
          visibility == 0.0 ? 1.0 : 0.0
        );
        break;
      }
    }
    this.viewport.Update();
  };

  render(): ReactNode {
    const { id } = this.props;
    return (
      <div id={id} className="glg_wrapper">
        <div id={`${id}-container`}>
          <div id={`${id}-loader`}></div>
        </div>
      </div>
    );
  }
}

export default Scada;
