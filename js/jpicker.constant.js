
constants = function () {
};

constants.id_canvas = "picker"; // id picker canvas
constants.id_canvas_wheel = "wheelpicker"; // id rhomus canvas - wheel picker only
constants.tag_canvas = null;
constants.tag_canvas_wheel = null;
constants.cont_canvas = null; // contex picker canvas
constants.cont_canvas_wheel = null; // contex rhomus canvas
constants.img_canvas = new Image();
constants.img_canvas_wheel = new Image(); // source image overlay for rhomus canvas
constants.mouse_pos_prev = new Vector(0, 0);
constants.mouse_pos = new Vector(0, 0);
constants.mouse_center = new Vector(225 / 2 - 1, 225 / 2 - 3); // Set mouse center for picker
constants.distance = 0;

constants.id_cursor = "cursorpicker"; // cursor picker canvas
constants.id_cursor_wheel = "cursorpicker_wheel"; // cursor rhomus canvas

constants.mouse_event = false; // Set status to get update value

constants.color_enable = true; // color is actived (color1 or color2)
constants.images_mooth = false; // images is actived (smooth or stepped)
constants.images_src1 = "images/picker-spectrum.png"; // first images is actived for smooth of picker canvas
constants.images_src2 = "images/picker-spectrum-stepped.png"; // first images is actived for stepped of picker canvas
constants.images_src1_wheel = "images/mask.png"; // first images is actived for smooth of rhomus canvas
constants.images_src2_wheel = "images/mask-stepped.png"; // first images is actived for stepped of rhomus canvas

constants.percentS = "";
constants.percentV = "";
constants.percentF = "";
constants.percentH = "";
constants.percentL = "";
constants.percentI = "";

constants.sVal = "";
constants.vVal = "";
constants.fVal = "";
constants.hVal = "";
constants.lVal = "";
constants.iVal = "";

constants.hsl = null;

constants.id_menu = "#Adjusment_Spectrum"; // id of menu is choose

constants.typeactive = "canvasNomal"; 
constants.colorofwheel = 'rgb(255, 250, 15)';
constants.wheel_circle = false;
constants.wheel_rhombus = false;
constants.wheel_save = {
    top: null,
    left: null
};

constants.steepness = 0;
constants.angle = 60;
