'use client'
import { PureComponent, ReactNode } from "react";

import {GlgToolkit} from './GlgToolkit';

const getScript = (src: string) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    return script;
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
  PROCESS_SPEED: number;
  HEATER_LEVEL_SPEED: number;
  WATER_LEVEL_SPEED: number;
  VALVE_CHANGE_SPEED: number;
  STEAM_VALVE_CHANGE_SPEED: number;
  SOLVENT_FLOW: number;
  STEAM_FLOW: number;
  COOLING_FLOW: number;
  WATER_FLOW: number;
  WaterAlarm: boolean;
  HeaterAlarm: boolean;
  ProcessCounter: number;
  heater_high: number;
  heater_low: number;
  water_high: number;
  water_low: number;
  steam_high: number;
  steam_low: number;
  cooling_high: number;
  cooling_low: number;
  SolventValve: number;
  SteamValve: number;
  CoolingValve: number;
  WaterValve: number;
  SteamFlow: number;
  CoolingFlow: number;
  WaterFlow: number;
  OutFlow: number;
  HeaterTemperature: number;
  SteamTemperature: number;
  BeforePreHeaterTemperature: number;
  PreHeaterTemperature: number;
  AfterPreHeaterTemperature: number;
  CoolingTemperature: number;
  HeaterPressure: number;
  HeaterLevel: number;
  WaterLevel: number;
  GLG: any;
  CoordScale: number;
  viewport: any;
  timer: NodeJS.Timeout | null;
  timer_3D: NodeJS.Timeout | null;

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
      this.UPDATE_INTERVAL = 50;    // msec

      // Constants that define simulation parameters.
      this.PROCESS_SPEED = 0.05,
      this.HEATER_LEVEL_SPEED = 0.05,
      this.WATER_LEVEL_SPEED = 0.02,
      this.VALVE_CHANGE_SPEED = 0.05,
      this.STEAM_VALVE_CHANGE_SPEED = 0.05;

      this.SOLVENT_FLOW = 0,
      this.STEAM_FLOW = 1,
      this.COOLING_FLOW = 2,
      this.WATER_FLOW = 3;

      // Variables used in the process simulation.
      this.WaterAlarm = false,
      this.HeaterAlarm = false;

      this.ProcessCounter = 0,
      this.heater_high = 0,
      this.heater_low = 0,
      this.water_high = 0,
      this.water_low = 0,
      this.steam_high = 0,
      this.steam_low = 0,
      this.cooling_high = 0,
      this.cooling_low = 0;

      this.SolventValve = 0.85,
      this.SteamValve = 1.0,
      this.CoolingValve = 0.8,
      this.WaterValve = 0.4,
      this.SOLVENT_FLOW = 0.0,
      this.SteamFlow = 0.0,
      this.CoolingFlow = 0.0,
      this.WaterFlow = 0.0,
      this.OutFlow = 3495.0,
      this.SteamTemperature = 0.0,
      this.HeaterTemperature = 0.0,
      this.BeforePreHeaterTemperature = 0.0,
      this.PreHeaterTemperature = 0.0,
      this.AfterPreHeaterTemperature = 0.0,
      this.CoolingTemperature = 0.0,
      this.HeaterPressure = 0.0,
      this.HeaterLevel = 0.5,
      this.WaterLevel = 0.1;
  }

  componentDidMount(): void {
    document.body.appendChild(getScript("../gunzip.min.js"));
    // document.body.appendChild(getScript("../fullscreen.js"));
    this.initialization()
  }

  initialization = () => {
      // Get a handle to the GLG Toolkit library.
      this.GLG = new GlgToolkit();
      // Debugging aid: uncomment the next line to throw an exception on a GLG error.
      //GLG.ThrowExceptionOnError( true, true, true );

      // Set initial size of the drawing.
      this.SetDrawingSize(false);

      // Increase canvas resolution for mobile devices.
      this.CoordScale = this.SetCanvasResolution();

      /* Loads misc. assets used by the program and invokes the LoadDrawing function
        when done.
      */
      this.LoadAssets(this.LoadDrawing);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Changes drawing size while maintaining width/height aspect ratio.
  //////////////////////////////////////////////////////////////////////////////
  SetDrawingSize = (next_size: boolean) => {
    const {id} = this.props;
    const ASPECT_RATIO = 3840 / 2160;

    // Settings for desktop displays.
    const MIN_WIDTH = 600;
    const MAX_WIDTH = 1422;
    const SCROLLBAR_WIDTH = 15;

    if (this.SetDrawingSize.size_index == undefined)   // first time
    {
      this.SetDrawingSize.size_index = 0;

      this.SetDrawingSize.small_sizes = [1, 1.5, 2., 2.5];
      this.SetDrawingSize.medium_sizes = [1, 0.75, 1.25, 1.5];
      this.SetDrawingSize.large_sizes = [1, 0.6, 1.25, 1.5];
      this.SetDrawingSize.num_sizes = this.SetDrawingSize.small_sizes.length;
      this.SetDrawingSize.is_mobile = (screen.width <= 760);

      window.addEventListener("resize", () => this.SetDrawingSize(false));
    }
    else if (next_size) {
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
    }
    else   /* Desktop */ {
      var span = document.body.clientWidth;
      span -= SCROLLBAR_WIDTH;

      var start_width;
      if (span < MIN_WIDTH)
          start_width = MIN_WIDTH;
      else if (span > MAX_WIDTH)
          start_width = MAX_WIDTH;
      else
          start_width = span;

      var size_array;
      if (span < 600)
          size_array = this.SetDrawingSize.small_sizes;
      else if (span < 800)
          size_array = this.SetDrawingSize.medium_sizes;
      else
          size_array = this.SetDrawingSize.large_sizes;

      var size_coeff = size_array[this.SetDrawingSize.size_index];
      var width = Math.trunc(Math.max(start_width * size_coeff, MIN_WIDTH));

      drawing_area.style.width = "" + width + "px";
      drawing_area.style.height = "" + Math.trunc(width / ASPECT_RATIO) + "px";
    }
  }

  RemoveElement = (name: string) => {
    var element = document.getElementById(name);
    if (element != null)
        element.parentNode.removeChild(element);
  }
   

  SetCanvasResolution = () => {
      // Set canvas resolution only for mobile devices with devicePixelRatio != 1.
      if (window.devicePixelRatio == 1. || !this.SetDrawingSize.is_mobile)
        return 1.0;   // Use coord scale = 1.0 for desktop.
  
      // Mobile devices use fixed device-width: disable Change Drawing Size button.
      this.RemoveElement("change_size");
  
      /* The first parameter defines canvas coordinate scaling with values 
        between 1 and devicePixelRatio. Values greater than 1 increase 
        canvas resolution and result in sharper rendering. The value of 
        devicePixelRatio may be used for very crisp rendering with very thin lines.
  
        Canvas scale > 1 makes text smaller, and the second parameter defines
        the text scaling factor used to increase text size.
  
        The third parameter defines the scaling factor that is used to
        scale down text in native widgets (such as native buttons, toggles, etc.)
        to match the scale of the drawing.
      */
      var coord_scale = 2.0;
      this.GLG.SetCanvasScale(coord_scale, 1.5, 0.6);
  
      return coord_scale;      // Chosen coord scale for mobile devices.
  }

  //////////////////////////////////////////////////////////////////////////////
  AssetLoaded = (glg_object: any, data: any, path: string) => {
    if (data.name == "scrollbar_h") {
      if (glg_object != null)
          glg_object.SetResourceObject("$config/GlgHScrollbar", glg_object);
    }
    else if (data.name == "scrollbar_v") {
      if (glg_object != null)
          glg_object.SetResourceObject("$config/GlgVScrollbar", glg_object);
    }
    else
      console.error("Unexpected asset name");

    /* Define an internal variable to keep the number of loaded assets. */
    if (this.AssetLoaded.num_loaded == undefined)
      this.AssetLoaded.num_loaded = 1;
    else
      ++this.AssetLoaded.num_loaded;

    // Invoke the callback after all assets have been loaded.
    if (this.AssetLoaded.num_loaded == 2)
      data.callback();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Loads any assets required by the application and invokes the specified
  // callback when done.
  // Alternatively, the application's drawing can be loaded as an asset here
  // as well, so that it starts loading without waiting for other assets to
  // finish loading.
  //////////////////////////////////////////////////////////////////////////////
  LoadAssets = (callback: () => void) => {
    /* HTML5 doesn't provide a scrollbar input element (only a range input 
      html element is available). This application needs to load GLG scrollbars
      used for integrated chart scrolling. For each loaded scrollbar, the 
      AssetLoaded callback is invoked with the supplied data.
    */
    this.GLG.LoadWidgetFromURL("../scrollbar_h.g", null, this.AssetLoaded,
      { name: "scrollbar_h", callback: callback });
    this.GLG.LoadWidgetFromURL("../scrollbar_v.g", null, this.AssetLoaded,
      { name: "scrollbar_v", callback: callback });
  }

  //////////////////////////////////////////////////////////////////////////////
  LoadDrawing = () => {
    const {urlFile} = this.props;
    /* Load a drawing from the process.g file. 
      The LoadCB callback will be invoked when the drawing has been loaded.
    */
    this.GLG.LoadWidgetFromURL(urlFile, null, this.LoadCB, null);
  }

  //////////////////////////////////////////////////////////////////////////////
  LoadCB = (drawing: any, data: any, path: string) => {
    const { id } = this.props;
    if (drawing == null) {
      window.alert("Can't load drawing, check console message for details.");
      return;
    }

    var loader = document.getElementById(`${id}-container`);
    if (loader)
      loader.parentNode.removeChild(loader);

    // Define the element in the HTML page to display the drawing in.
    drawing.SetParentElement(id);

    // Disable viewport border to use the border of the glg_area.
    drawing.SetDResource("LineWidth", 0);

    this.StartProcessDemo(drawing);
  }

  //////////////////////////////////////////////////////////////////////////////
  StartProcessDemo = (drawing: any) => {
    this.viewport = drawing;

    this.InitDrawing();
    this.viewport.InitialDraw();

    // Start periodic updates.
    this.timer = setTimeout(this.IterateProcess, this.UPDATE_INTERVAL);

    // Show 3D pipes after a few seconds.
    this.timer_3D = setTimeout(this.Toggle3D, 3000);
  }

  //////////////////////////////////////////////////////////////////////////////
  InitDrawing = () => {
    const {data_init} = this.props;

    data_init.map((item)=> {
      this.viewport.SetDResource(item.label, item.value);
    })

    // this.viewport.SetDResource("StirMotor1/OperatingState", 1);
    // this.viewport.SetDResource("3DPipesToggle/LineWidth", 1.0);
    // this.viewport.SetGResource("3DPipesToggle/EdgeColor", 0.7, 0.7, 0.7);

    // this.viewport.SetDResource("FlowToggle/ShadowWidth", 0.0);
    // this.viewport.SetDResource("FlowToggle/LineWidth", 1.0);
    // this.viewport.SetGResource("FlowToggle/EdgeColor", 0.7, 0.7, 0.7);

    this.AdjustForMobileDevices();

    this.viewport.AddListener(this.GLG.GlgCallbackType.INPUT_CB, this.InputCallback);
    this.viewport.AddListener(this.GLG.GlgCallbackType.SELECT_CB, this.SelectCallback);

    // this.viewport.SetDResource("Stretch", 0);
    // this.viewport.SetDResource("PushIn", 1);
    // this.viewport.SetDResource("YScale", 0.92);
    // this.viewport.SetDResource("XScale", 1.08);
  }

  //////////////////////////////////////////////////////////////////////////////
  AdjustForMobileDevices = () => {
    if (screen.width < 600)
      // Increase button lengths for small screens to fit labels.
      this.viewport.SetDResource("FlowToggle/XScale", 1.2);

    /* Adjust chart offsets to fit chart labels on mobile devices with 
      canvas scaling.
    */
    if (this.CoordScale != 1.0) {
      var chart = this.viewport.GetResourceObject("ChartVP/Chart");  /* GlgObject */
      this.AdjustOffset(chart, "OffsetTop", 10.);
      this.AdjustOffset(chart, "OffsetLeft", 10.);
      this.AdjustOffset(chart, "OffsetBottom", -5.);
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // Adjusts the specified offset by a requested amount.
  //////////////////////////////////////////////////////////////////////////////
  AdjustOffset = ( /* GlgObject */ object: any, /* String */ offset_name: string,
    /* double */ adjustment: number) => {
    var value = object.GetDResource(offset_name);   /* double */
    value += adjustment;
    object.SetDResource(offset_name, value);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Handle user interaction with the buttons, as well as process custom
  // actions attached to objects in the drawing.
  //////////////////////////////////////////////////////////////////////////////
  InputCallback = (vp: any, message_obj: any) => {
    var origin = message_obj.GetSResource("Origin");
    var format = message_obj.GetSResource("Format");
    var action = message_obj.GetSResource("Action");
    // var subaction = message_obj.GetSResource( "SubAction" );
    console.log('InputCallback', origin, format, action)

    if (format == "Button") {
      if (action != "ValueChanged")
          return;

      var _3D_pipes_visible =
          (this.viewport.GetDResource("3DPipesToggle/OnState") != 0.0);
      var flow_lines_visible =
          (this.viewport.GetDResource("FlowToggle/OnState") != 0.0);

      if (origin == "3DPipesToggle") {
          /* Make flow lines visible if both 3D pipes and flow lines were 
            turned off.
          */
          if (!_3D_pipes_visible && !flow_lines_visible) {
            this.viewport.SetDResource("FlowToggle/OnState", 1.0);
            this.viewport.Update();
          }

          this.Clear3DTimer();
      }
      else if (origin == "FlowToggle") {
          /* Make 3D pipes visible if both flow lines and 3D pipes were
            turned off.
          */
          if (!_3D_pipes_visible && !flow_lines_visible) {
            this.viewport.SetDResource("3DPipesToggle/OnState", 1.0);
            this.viewport.Update();
          }

          this.Clear3DTimer();
      }
      else if (origin == "ToggleAutoScroll") {
          /* Activate chart's X pan slider when AutoScroll=OFF.
            The toggle is connected to the chart's AutoScroll and controls 
            it. The X pan slider is activated here.
          */
          var auto_scroll =
            (this.viewport.GetDResource("ChartVP/Chart/AutoScroll") != 0.0);
          this.viewport.SetDResource("ChartVP/Pan",
            (auto_scroll ? this.GLG.GlgPanType.PAN_Y_AUTO :
                this.GLG.GlgPanType.PAN_X | this.GLG.GlgPanType.PAN_Y));

          if (auto_scroll) {
            /* Reset the chart's ranges when returning to auto-scroll. */
            this.viewport.SetDResource("ChartVP/Chart/Plots/Plot#0/YLow", 50.0);
            this.viewport.SetDResource("ChartVP/Chart/Plots/Plot#0/YHigh", 150.0);
          }
          this.viewport.Update();
      }
    }
    else if (format == "CustomEvent") {
      /* If USE_ACTIONS=false, user clicks on objects are processed using
          simple selection via object names in the Select callback.
      */
      if (!this.USE_ACTIONS)
          return;

      /* Handle custom event actions attached to valves to open or close 
          them when the user clicks on them with the left or right mouse 
          button.
      */
      var event_label = message_obj.GetSResource("EventLabel");
      var button = message_obj.GetDResource("ButtonIndex");

      var increment;
      if (button == 1)
          increment = 1.0;
      else
          increment = -1.0;

      if (event_label == "SolventValveClick") {
        this.SolventValve += 0.2 * increment;
        this.SolventValve = this.PutInRange( this.SolventValve, 0.0, 1.0);
        this. viewport.SetDResource("SolventValve/Value",  this.SolventValve);
      }
      else if (event_label == "SteamValveClick") {
          this.SteamValve += 0.2 * increment;
          this.SteamValve = this.PutInRange(this.SteamValve, 0.0, 1.0);
          this.viewport.SetDResource("SteamValve/Value", this.SteamValve);
      }
      else if (event_label == "CoolingValveClick") {
          this.CoolingValve += 0.2 * increment;
          this.CoolingValve = this.PutInRange(this.CoolingValve, 0.0, 1.0);
          this.viewport.SetDResource("CoolingValve/Value", this.CoolingValve);
      }
      else if (event_label == "WaterValveClick") {
          this.WaterValve += 0.2 * increment;
          this.WaterValve = this.PutInRange(this.WaterValve, 0.0, 1.0);
          this.viewport.SetDResource("WaterValve/Value", this.WaterValve);
      }
      /* Erase or display the pressure gauge when the gauge or the heater
          are clicked on.
      */
      else if (event_label == "HeaterClick" ||
          event_label == "PressureGaugeClick") {
          var visibility = this.viewport.GetDResource("PressureGauge/Visibility");
          this.viewport.SetDResource("PressureGauge/Visibility",
            visibility == 0 ? 1.0 : 0.0);
      }
      this.viewport.Update();
    }
    else if (format == "Timer")   // Handles timer transformations.
      this.viewport.Update();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Clears the timer used to demo 3D pipes.
  //////////////////////////////////////////////////////////////////////////////
  Clear3DTimer = () => {
    if (this.timer_3D == null)
      return;

    clearTimeout(this.timer_3D);
    this.timer_3D = null;
  }

  //////////////////////////////////////////////////////////////////////////////
  // SIMULATION ONLY
  //////////////////////////////////////////////////////////////////////////////
  PutInRange = (variable: number, low: number, high: number) => {
    if (variable < low)
      return low;
    else if (variable > high)
      return high;
    else
      return variable;
  }

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
    var
      visibility,
      increment;
    var name;

    /* If USE_ACTIONS=true, Input callback is used to process user clicks
      via actions attached to objects, instead of using the Select callback.
    */
    if (this.USE_ACTIONS)
      return;

    // Process user clicks on objects using simple selection via object names.
    if (name_array == null)
      return;

    if (button == 1)
      increment = 1.0;
    else
      increment = -1.0;

    for (var i = 0; (name = name_array[i]) != null; ++i) {
      if (name == "SolventValve") {
          this.SolventValve += 0.2 * increment;
          this.SolventValve = this.PutInRange(this.SolventValve, 0.0, 1.0);
          this.viewport.SetDResource("SolventValve/Value", this.SolventValve);
          break;
      }
      else if (name == "SteamValve") {
        this.SteamValve += 0.2 * increment;
        this.SteamValve = this.PutInRange(this.SteamValve, 0.0, 1.0);
        this.viewport.SetDResource("SteamValve/Value", this.SteamValve);
          break;
      }
      else if (name == "CoolingValve") {
        this.CoolingValve += 0.2 * increment;
        this.CoolingValve = this.PutInRange(this.CoolingValve, 0.0, 1.0);
        this.viewport.SetDResource("CoolingValve/Value", this.CoolingValve);
          break;
      }
      else if (name == "WaterValve") {
        this.WaterValve += 0.2 * increment;
        this.WaterValve = this.PutInRange(this.WaterValve, 0.0, 1.0);
        this.viewport.SetDResource("WaterValve/Value", this.WaterValve);
          break;
      }
      else if (name.indexOf("Heater") == 0 ||
          name.indexOf("PressureGauge") == 0) {
          visibility = this.viewport.GetDResource("PressureGauge/Visibility");
          this.viewport.SetDResource("PressureGauge/Visibility",
            visibility == 0.0 ? 1.0 : 0.0);
          break;
      }
    }
    this.viewport.Update();
  }

  //////////////////////////////////////////////////////////////////////////////
  IterateProcess = () => {
    this.GetProcessData();          // Get new process data.

    this.UpdateDrawingWithData();   // Update the drawing with the new data.

    // Restart update timer.
    this.timer = setTimeout(this.IterateProcess, this.UPDATE_INTERVAL);
  }

  //////////////////////////////////////////////////////////////////////////////
  // In a real application, this function will query live process data.
  //
  // This demo uses simulated data to animate the drawing.
  //////////////////////////////////////////////////////////////////////////////
  GetProcessData = () => {
    this.GetSimulatedData();
  }

  //////////////////////////////////////////////////////////////////////////////
  // SIMULATION ONLY
  // Recalculate simulated values used to animate the demo.
  //////////////////////////////////////////////////////////////////////////////
  GetSimulatedData = () => {
    ++this.ProcessCounter;
    if (this.ProcessCounter == 0x7fffffff)
    this.ProcessCounter = 0;

    this.SteamTemperature += (this.SteamValve - 0.6) * 2 * this.PROCESS_SPEED;
    this.SteamTemperature = this.PutInRange(this.SteamTemperature, 0.0, 1.0);

    this.HeaterTemperature +=
      (this.SteamTemperature - this.HeaterTemperature * this.HeaterLevel) * this.PROCESS_SPEED;
      this.HeaterTemperature = this.PutInRange(this.HeaterTemperature, 0.0, 1.5);

      this.BeforePreHeaterTemperature +=
      (1.5 * this.HeaterTemperature - this.BeforePreHeaterTemperature) * this.PROCESS_SPEED;
      this.BeforePreHeaterTemperature =
      this.PutInRange(this.BeforePreHeaterTemperature, 0.0, 1.0);

      this.PreHeaterTemperature +=
      (this.BeforePreHeaterTemperature - this.PreHeaterTemperature) * this.PROCESS_SPEED;
      this.PreHeaterTemperature = this.PutInRange(this.PreHeaterTemperature, 0.0, 1.0);

      this.AfterPreHeaterTemperature +=
      (0.9 * this.HeaterTemperature - this.AfterPreHeaterTemperature) *
      this.PROCESS_SPEED;
      this.AfterPreHeaterTemperature =
      this.PutInRange(this.AfterPreHeaterTemperature, 0.0, 1.0);

      this.CoolingTemperature +=
      (this.AfterPreHeaterTemperature - this.CoolingTemperature - this.CoolingValve)
      * this.PROCESS_SPEED;
      this.CoolingTemperature = this.PutInRange(this.CoolingTemperature, 0.0, 1.0);

      this.OutFlow = this.SolventValve * 3495.0;

      this.HeaterLevel += (this.SolventValve - 0.75) * this.HEATER_LEVEL_SPEED;
      this.HeaterLevel = this.PutInRange(this.HeaterLevel, 0.0, 1.0);

    // Inversed
    this.WaterLevel += (0.5 - this.WaterValve) * this.WATER_LEVEL_SPEED;
    this.WaterLevel = this.PutInRange(this.WaterLevel, 0.0, 1.0);

    if (this.HeaterLevel > 0.9 || this.heater_high != 0) {
      this.heater_high = this.LagVar(this.heater_high, 10);
      this.SolventValve -= this.VALVE_CHANGE_SPEED;
    }
    else if (this.HeaterLevel < 0.45 || this.heater_low != 0) {
      this.heater_low = this.LagVar(this.heater_low, 10);
      this.SolventValve += this.VALVE_CHANGE_SPEED;
    }
    this.SolventValve = this.PutInRange(this.SolventValve, 0.0, 1.0);

    // Inversed
    if (this.WaterLevel > 0.2 || this.water_high != 0) {
      this.water_high = this.LagVar(this.water_high, 10);
      this.WaterValve += this.VALVE_CHANGE_SPEED;
    }
    else if (this.WaterLevel < 0.05 || this.water_low != 0) {
      this.water_low = this.LagVar(this.water_low, 10);
      this.WaterValve -= this.VALVE_CHANGE_SPEED;
    }
    this.WaterValve = this.PutInRange(this.WaterValve, 0.0, 1.0);

    if (this.SteamTemperature > 0.9 || this.steam_high != 0) {
      this.LagVar(this.steam_high, 20);
      this.SteamValve -= this.STEAM_VALVE_CHANGE_SPEED;
    }
    else if (this.SteamTemperature < 0.2 || this.steam_low != 0) {
      this.LagVar(this.steam_low, 20);
      this.SteamValve += this.STEAM_VALVE_CHANGE_SPEED;
    }
    this.SteamValve = this.PutInRange(this.SteamValve, 0.0, 1.0);

    if (this.CoolingTemperature > 0.7 || this.cooling_high != 0) {
      this.LagVar(this.cooling_high, 10);
      this.CoolingValve += this.VALVE_CHANGE_SPEED;
    }
    else if (this.CoolingTemperature < 0.3 || this.cooling_low != 0) {
      this.LagVar(this.cooling_low, 10);
      this.CoolingValve -= this.VALVE_CHANGE_SPEED;
    }
    this.CoolingValve = this.PutInRange(this.CoolingValve, 0.0, 1.0);

    this.HeaterPressure = this.HeaterLevel * (this.HeaterTemperature + 1.0) / 2.0;
    this.HeaterPressure = this.PutInRange(this.HeaterPressure, 0.0, 1.0);

    this.HeaterAlarm = (this.HeaterLevel < 0.45 || this.HeaterLevel > 0.9);
    this.WaterAlarm = (this.WaterLevel > 0.2 || this.WaterLevel < 0.05);
  }

  //////////////////////////////////////////////////////////////////////////////
  // SIMULATION ONLY
  // Helps to implement lag behavior
  //////////////////////////////////////////////////////////////////////////////
  LagVar = (variable: number, lag: number) => {
    if (variable != 0)
      return --variable;
    else
      return lag;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Updates the drawing with the new data.
  //////////////////////////////////////////////////////////////////////////////
  UpdateDrawingWithData = () => {
    // The drawing can be updated using either tags or resources.
    if (this.USE_TAGS)
      this.UpdateProcessTags();
    else
      this.UpdateProcessResources();

    this.viewport.Update();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Updates drawing using tags. Each tag is referenced by name and is set
  // to a value of the corresponding variable.
  //////////////////////////////////////////////////////////////////////////////
  UpdateProcessTags = () => {
    // this.viewport.SetDTag("SolventValveValue", this.SolventValve, true);
    // this.viewport.SetDTag("SteamValveValue", this.SteamValve, true);
    // this.viewport.SetDTag("CoolingValveValue", this.CoolingValve, true);
    // this.viewport.SetDTag("WaterValveValue", this.WaterValve, true);

    // this.viewport.SetDTag("SolventFlow", this.GetFlow(this.SOLVENT_FLOW), true);
    // this.viewport.SetDTag("SteamFlow", this.GetFlow(this.STEAM_FLOW), true);
    // this.viewport.SetDTag("CoolingFlow", this.GetFlow(this.COOLING_FLOW), true);
    // this.viewport.SetDTag("WaterFlow", this.GetFlow(this.WATER_FLOW), true);

    // this.viewport.SetDTag("OutFlow", this.OutFlow, true);

    // this.viewport.SetDTag("SteamTemperature", this.SteamTemperature, true);
    // this.viewport.SetDTag("HeaterTemperature", this.HeaterTemperature, true);
    // this.viewport.SetDTag("BeforePreHeaterTemperature",
    // this.BeforePreHeaterTemperature, true);
    //   this.viewport.SetDTag("PreHeaterTemperature", this.PreHeaterTemperature, true);
    //   this.viewport.SetDTag("AfterPreHeaterTemperature",
    //   this.AfterPreHeaterTemperature, true);
    //   this.viewport.SetDTag("CoolingTemperature", this.CoolingTemperature, true);

    //   this.viewport.SetDTag("HeaterLevel", this.HeaterLevel, true);
    //   this.viewport.SetDTag("WaterLevel", this.WaterLevel, true);

    //   this.viewport.SetDTag("HeaterAlarm", this.HeaterAlarm ? 1.0 : 0.0, true);
    //   this.viewport.SetDTag("WaterAlarm", this.WaterAlarm ? 1.0 : 0.0, true);

    // /* Pass if_changed=false to move the chart even if the value did not 
    //   change. The rest of resources use true to update them only if their 
    //   values changed.
    // */
    //   this.viewport.SetDTag("PlotValueEntryPoint", this.HeaterTemperature, false);

    //   this.viewport.SetDTag("PressureValue", 5.0 * this.HeaterPressure, true);
  }

    //////////////////////////////////////////////////////////////////////////////
    // SIMULATION ONLY
    // Returns the flow value, which is later used as a line type value used 
    // to simulate liquid flow.
    //////////////////////////////////////////////////////////////////////////////
    GetFlow = (type: number) => {
      if (type == this.SOLVENT_FLOW)
        return this.SolventFlow = this.GetFlowValue(this.SolventFlow, this.SolventValve);
      else if (type == this.STEAM_FLOW)
        return this.SteamFlow = this.GetFlowValue(this.SteamFlow, this.SteamValve);
      else if (type == this.COOLING_FLOW)
        return this.CoolingFlow = this.GetFlowValue(this.CoolingFlow, this.CoolingValve);
      else if (type == this.WATER_FLOW)
        return this.WaterFlow = this.GetFlowValue(this.WaterFlow,this. WaterValve);
      else
        return 0.0;
    }

  //////////////////////////////////////////////////////////////////////////////
  // SIMULATION ONLY
  // Recalculates the line type values used to simulate liquid flow based
  // on the previous line type value and a flow speed defined by the valve
  // opening.
  // Parameters:
  //     state - last value of the line type
  //     valve - current valve opening
  //
  // Shifting the line type pattern's offset is achieved by increasing the
  // line type value by 32.0 Refer to the documentation of the polygon's 
  // LineType resource for more details.   
  // Alternatively, the flow line widget from the Custom Object palette
  // may be used for integrated flow line functionality, in which case
  // this code is not needed. 
  //////////////////////////////////////////////////////////////////////////////
  GetFlowValue = (state: any, valve: number) => {
    var
      value,
      update_interval;
    const
      FLOW_LINE_TYPE = 24,
      NO_FLOW_LINE_TYPE = 0,
      MAX_FLOW = 3;

    if (valve == 0)
      value = NO_FLOW_LINE_TYPE;     // Valve is closed - no flow.
    else {
      if (state == 0.0)
          value = FLOW_LINE_TYPE;    // First time: init to FLOW_LINE_TYPE.
      else {
          // Skip a few intervals to represent variable flow speed.
          update_interval = MAX_FLOW - Math.trunc((valve + 0.1) * MAX_FLOW);
          update_interval = Math.min(0, update_interval);
          update_interval = Math.max(MAX_FLOW, update_interval);
          if (update_interval == 0 ||
            (this.ProcessCounter % update_interval) == 0) {
            /* Add 32 to the line type value to increase the line type 
                pattern's offset by 1.
            */
            value = state + 32;

            /* Reset periodically at the end of the pattern to prevent 
                overflow. Since the length of the GDI pattern is 24 and 
                the length of the OpenGL pattern is 16, reset after 24 * 16 
                iterations to handle both.
            */
            if (value == FLOW_LINE_TYPE + 32 * 24 * 16)
                value = FLOW_LINE_TYPE;
          }
          else
            // No change: skipping a few intervals to show a slow speed.
            value = state;
      }
    }

    return value;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Updates drawing using heirarchical resources. Each resource is
  // referenced by a resource path and is set to a value of the
  // corresponding variable.
  //////////////////////////////////////////////////////////////////////////////
  UpdateProcessResources = () => {
    this.viewport.SetDResourceIf("SolventValve/Value", this.SolventValve, true);
    this.viewport.SetDResourceIf("SteamValve/Value", this.SteamValve, true);
    this.viewport.SetDResourceIf("CoolingValve/Value", this.CoolingValve, true);
    this.viewport.SetDResourceIf("WaterValve/Value", this.WaterValve, true);

    this.viewport.SetDResourceIf("SolventFlow", this.GetFlow(this.SOLVENT_FLOW), true);
    this.viewport.SetDResourceIf("SteamFlow", this.GetFlow(this.STEAM_FLOW), true);
    this.viewport.SetDResourceIf("CoolingFlow", this.GetFlow(this.COOLING_FLOW), true);
    this.viewport.SetDResourceIf("WaterFlow", this.GetFlow(this.WATER_FLOW), true);

    this.viewport.SetDResourceIf("OutFlow", this.OutFlow, true);

    this.viewport.SetDResourceIf("Heater/SteamTemperature", this.SteamTemperature, true);
    this.viewport.SetDResourceIf("Heater/HeaterTemperature",this.HeaterTemperature, true);
    this.viewport.SetDResourceIf("BeforePreHeaterTemperature",this.BeforePreHeaterTemperature, true);
    this.viewport.SetDResourceIf("PreHeaterTemperature", this.PreHeaterTemperature, true);
    this.viewport.SetDResourceIf("AfterPreHeaterTemperature",this.AfterPreHeaterTemperature, true);
    this.viewport.SetDResourceIf("CoolingTemperature", this.CoolingTemperature, true);

    this.viewport.SetDResourceIf("Heater/HeaterLevel", this.HeaterLevel, true);
    this.viewport.SetDResourceIf("WaterSeparator/WaterLevel", this.WaterLevel, true);

    this.viewport.SetDResourceIf("HeaterAlarm", this.HeaterAlarm ? 1.0 : 0.0, true);
    this.viewport.SetDResourceIf("WaterAlarm", this.WaterAlarm ? 1.0 : 0.0, true);

    /* Pass if_changed=false to move the chart even if the value did not 
      change. The rest of resources use true to update them only if their 
      values changed.
    */
    this.viewport.SetDResourceIf("ChartVP/Chart/Plots/Plot#0/ValueEntryPoint",
    this.HeaterTemperature, false);

    this.viewport.SetDResourceIf("PressureGauge/Value", 5.0 * this.HeaterPressure, true);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Toggles 3D pipes when the "Toggle 3D" HTML button is pressed.
  //////////////////////////////////////////////////////////////////////////////
  Toggle3D = () => {
    var _3D_pipes_visible =
      (this.viewport.GetDResource("3DPipesToggle/OnState") != 0.0);
    var flow_lines_visible =
      (this.viewport.GetDResource("FlowToggle/OnState") != 0.0);

    // Toggle 3D pipes display.
    _3D_pipes_visible = (_3D_pipes_visible == 1 ? 0 : 1);
    this.viewport.SetDResource("3DPipesToggle/OnState", _3D_pipes_visible);

    // Make flow lines visible if both 3D pipes and flow lines were turned off.
    if (!_3D_pipes_visible && !flow_lines_visible)
      this.viewport.SetDResource("FlowToggle/OnState", 1.0);

    this.viewport.Update();

    this.Clear3DTimer();
  }

    render(): ReactNode {
      const {id} = this.props;
      return (
        <div id={id} className="glg_wrapper">
            <div id={`${id}-container`}>
                <div id={`${id}-loader`}></div>
            </div>
        </div>
      )
    }
}

export default Scada