
pickerUntil = function () {
};

pickerUntil.div_pos = null;
pickerUntil.div_cursor = null;

//~-----------------------------------------------------------------------------------------------------------------------------------------

/* Convert RGB Mode To Hexal Mode */
pickerUntil.convertRGBToHex = function (R, G, B) {
    return '#' + pickerUntil.toHex(R) + pickerUntil.toHex(G) + pickerUntil.toHex(B)
};

pickerUntil.toHex = function (n) {
    n = parseInt(n, 10);
    if (isNaN(n)) return "00";
    n = Math.max(0, Math.min(n, 255));
    return "0123456789ABCDEF".charAt((n - n % 16) / 16)
            + "0123456789ABCDEF".charAt(n % 16);
};

/* Convert RGB Mode To HSV Mode */
pickerUntil.convertRGBToHSV = function (r, g, b) {
    var arrHSV;
    r = (r / 255);
    g = (g / 255);
    b = (b / 255);
    var min = Math.min(Math.min(r, g), b),
        max = Math.max(Math.max(r, g), b),
        delta = max - min;
    var value = max,
        saturation, hue;
    // Hue  
    if (max == min) {
        hue = 0;
    } else if (max == r) {
        hue = (60 * ((g - b) / (max - min))) % 360;
    } else if (max == g) {
        hue = 60 * ((b - r) / (max - min)) + 120;
    } else if (max == b) {
        hue = 60 * ((r - g) / (max - min)) + 240;
    }
    if (hue < 0) {
        hue += 360;
    }
    // Saturation  
    if (max == 0) {
        saturation = 0;
    } else {
        saturation = 1 - (min / max);
    }
    arrHSV = new Array(Math.round(hue), Math.round(saturation * 100), Math.round(value * 100));
    return arrHSV;
};

/* Convert Hex Mode To RGB Mode */
pickerUntil.getColorRGBFromHex = function (colorHEX) {
    var colorRGB;
    if (colorHEX[0] == "#") colorHEX = colorHEX.substr(1);
    if (colorHEX.length == 3) {
        var temp = colorHEX; colorHEX = '';
        temp = /^([a-f0-9])([a-f0-9])([a-f0-9])$/i.exec(temp).slice(1);
        for (var i = 0; i < 3; i++) colorHEX += temp[i] + temp[i];
    }
    var triplets = /^([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/i.exec(colorHEX).slice(1);
    var red = parseInt(triplets[0], 16);
    var green = parseInt(triplets[1], 16);
    var blue = parseInt(triplets[2], 16);
    colorRGB = 'rgb(' + red + ',' + green + ',' + blue + ')';
    return colorRGB;
};

/* Convert HSL Mode To RGB Mode */
pickerUntil.convertHSLToRGB = function (hsl) {
    var m1, m2, r, g, b;
    var h = hsl[0], s = hsl[1], l = hsl[2];
    m2 = (l <= 0.5) ? l * (s + 1) : l + s - l * s;
    m1 = l * 2 - m2;
    return [
        this.convertHueToRGB(m1, m2, h + 0.33333),
        this.convertHueToRGB(m1, m2, h),
        this.convertHueToRGB(m1, m2, h - 0.33333)
    ];
};

pickerUntil.convertHueToRGB = function (m1, m2, h) {
    h = (h < 0) ? h + 1 : ((h > 1) ? h - 1 : h);
    if (h * 6 < 1) return m1 + (m2 - m1) * h * 6;
    if (h * 2 < 1) return m2;
    if (h * 3 < 2) return m1 + (m2 - m1) * (0.66666 - h) * 6;
    return m1;
};

/* Convert RGB Mode To HSL Mode */
pickerUntil.convertRGBToHSL = function (rgb) {
    var min, max, delta, h, s, l;
    var r = rgb[0], g = rgb[1], b = rgb[2];
    min = Math.min(r, Math.min(g, b));
    max = Math.max(r, Math.max(g, b));
    delta = max - min;
    l = (min + max) / 2;
    s = 0;
    if (l > 0 && l < 1) {
        s = delta / (l < 0.5 ? (2 * l) : (2 - 2 * l));
    }
    h = 0;
    if (delta > 0) {
        if (max == r && max != g) h += (g - b) / delta;
        if (max == g && max != b) h += (2 + (b - r) / delta);
        if (max == b && max != r) h += (4 + (r - g) / delta);
        h /= 6;
    }
    return [h, s, l];
};


/* Split R,G,B value from background RGB */
pickerUntil.splitRGBFromBackgroundRGB = function (bgRGB) {
    bgRGB = bgRGB.replace('rgb', '').replace('(', '').replace(')', '').replace(' ', '').replace(' ', '').replace(' ', '');
    var arrRGB = bgRGB.split(',');
    return arrRGB;
};

/* Get Percent Lightness / Darkness for Group Gradient Color */
pickerUntil.getIncreaseBrightnessDarknessFromHEX = function (type, hexColor, percent) {
    // Strip the leading # if it's there
    hexColor = hexColor.replace(/^\s*#|\s*$/g, '');
    // Convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if (hexColor.length == 3) {
        hexColor = hexColor.replace(/(.)/g, '$1$1');
    }
    var r = parseInt(hexColor.substr(0, 2), 16),
         g = parseInt(hexColor.substr(2, 2), 16),
         b = parseInt(hexColor.substr(4, 2), 16);
    var hexResult = (type === 'brightness') ?
    ('#' + ((0 | (1 << 8) + r + (256 - r) * percent / 100).toString(16)).substr(1) + ((0 | (1 << 8) + g + (256 - g) * percent / 100).toString(16)).substr(1) + ((0 | (1 << 8) + b + (256 - b) * percent / 100).toString(16)).substr(1))
    :
    ('#' + ((0 | (1 << 8) + r * (1 - percent / 100)).toString(16)).substr(1) + ((0 | (1 << 8) + g * (1 - percent / 100)).toString(16)).substr(1) + ((0 | (1 << 8) + b * (1 - percent / 100)).toString(16)).substr(1));
    return hexResult;
};

/* Get Color for Group Gradient */
pickerUntil.getGradientFromBackgroundRGB = function (bgRGB) {
    if (bgRGB == undefined || bgRGB === "") {
        return null;
    }
    var RGB = pickerUntil.splitRGBFromBackgroundRGB(bgRGB);
    var R = RGB[0];
    var G = RGB[1];
    var B = RGB[2];
    var HEX = pickerUntil.convertRGBToHex(R, G, B);
    groupGradient = {
        gr100: 'rgb(' + 255 + ',' + 255 + ',' + 255 + ')',
        gr80: pickerUntil.getColorRGBFromHex(pickerUntil.getIncreaseBrightnessDarknessFromHEX('brightness', HEX, 80)),
        gr60: pickerUntil.getColorRGBFromHex(pickerUntil.getIncreaseBrightnessDarknessFromHEX('brightness', HEX, 60)),
        gr40: pickerUntil.getColorRGBFromHex(pickerUntil.getIncreaseBrightnessDarknessFromHEX('brightness', HEX, 40)),
        gr20: pickerUntil.getColorRGBFromHex(pickerUntil.getIncreaseBrightnessDarknessFromHEX('brightness', HEX, 20)),
        gr0: 'rgb(' + R + ',' + G + ',' + B + ')',
        gr_20: pickerUntil.getColorRGBFromHex(pickerUntil.getIncreaseBrightnessDarknessFromHEX('darkness', HEX, 20)),
        gr_40: pickerUntil.getColorRGBFromHex(pickerUntil.getIncreaseBrightnessDarknessFromHEX('darkness', HEX, 40)),
        gr_60: pickerUntil.getColorRGBFromHex(pickerUntil.getIncreaseBrightnessDarknessFromHEX('darkness', HEX, 60)),
        gr_80: pickerUntil.getColorRGBFromHex(pickerUntil.getIncreaseBrightnessDarknessFromHEX('darkness', HEX, 80)),
        gr_100: pickerUntil.getColorRGBFromHex(pickerUntil.getIncreaseBrightnessDarknessFromHEX('darkness', HEX, 100)),
    };
    return groupGradient;
};

/* Set Color for Group Gradient  */
pickerUntil.setGradientFromBackgroundRGB = function (IDbgColorRGB) {
    var rgbColor = $(IDbgColorRGB).css('backgroundColor');
    var groupGradient = pickerUntil.getGradientFromBackgroundRGB(rgbColor);
    if (IDbgColorRGB === '.color1') {
        $('div#Gra1-01').css('backgroundColor', groupGradient.gr100);
        $('div#Gra1-02').css('backgroundColor', groupGradient.gr80);
        $('div#Gra1-03').css('backgroundColor', groupGradient.gr60);
        $('div#Gra1-04').css('backgroundColor', groupGradient.gr40);
        $('div#Gra1-05').css('backgroundColor', groupGradient.gr20);
        $('div#Gra1-06').css('backgroundColor', groupGradient.gr0);
        $('div#Gra1-07').css('backgroundColor', groupGradient.gr_20);
        $('div#Gra1-08').css('backgroundColor', groupGradient.gr_40);
        $('div#Gra1-09').css('backgroundColor', groupGradient.gr_60);
        $('div#Gra1-10').css('backgroundColor', groupGradient.gr_80);
        $('div#Gra1-11').css('backgroundColor', groupGradient.gr_100);
    } else {
        $('div#Gra2-01').css('backgroundColor', groupGradient.gr100);
        $('div#Gra2-02').css('backgroundColor', groupGradient.gr80);
        $('div#Gra2-03').css('backgroundColor', groupGradient.gr60);
        $('div#Gra2-04').css('backgroundColor', groupGradient.gr40);
        $('div#Gra2-05').css('backgroundColor', groupGradient.gr20);
        $('div#Gra2-06').css('backgroundColor', groupGradient.gr0);
        $('div#Gra2-07').css('backgroundColor', groupGradient.gr_20);
        $('div#Gra2-08').css('backgroundColor', groupGradient.gr_40);
        $('div#Gra2-09').css('backgroundColor', groupGradient.gr_60);
        $('div#Gra2-10').css('backgroundColor', groupGradient.gr_80);
        $('div#Gra2-11').css('backgroundColor', groupGradient.gr_100);
    }
};

/* Get Values For Color Modes */
pickerUntil.getValueTextFromBackgroundRGB = function (bgRGB) {
    if (bgRGB == undefined || bgRGB === "") {
        return null;
    }
    var RGB = pickerUntil.splitRGBFromBackgroundRGB(bgRGB);
    var HSL = pickerUntil.convertRGBToHSL(RGB);
    var R = RGB[0];
    var G = RGB[1];
    var B = RGB[2];
    var HSV = pickerUntil.convertRGBToHSV(R, G, B),
        groupValueColor = {
            RGB: RGB,
            R: R,
            G: G,
            B: B,
            HSL: HSL,
            HEXAL: pickerUntil.convertRGBToHex(R, G, B),
            HSV: HSV,
            H: HSV[0],
            S: HSV[1],
            V: HSV[2],
        };
    return groupValueColor;
};

/* Set Value For Color Mode */
pickerUntil.setValueTextFromBackgroundRGB = function (bgRGB) {
    var groupValueColor = pickerUntil.getValueTextFromBackgroundRGB(bgRGB);
    $('#rVal').val(groupValueColor.R);
    $('#gVal').val(groupValueColor.G);
    $('#bVal').val(groupValueColor.B);
    var r2Val = (groupValueColor.R / 255).toFixed(4).toString();
    r2Val = r2Val.replace('.0000', '');
    var g2Val = (groupValueColor.G / 255).toFixed(4).toString();
    g2Val = g2Val.replace('.0000', '');
    var b2Val = (groupValueColor.B / 255).toFixed(4).toString();
    b2Val = b2Val.replace('.0000', '');
    $('#r2Val').val(r2Val);
    $('#g2Val').val(g2Val);
    $('#b2Val').val(b2Val);
    $('#hexVal').val(groupValueColor.HEXAL);
    $('#hVal').val(groupValueColor.H);
    $('#sVal').val(groupValueColor.S);
    $('#vVal').val(groupValueColor.V);

    constants.angle = groupValueColor.H - 60;
    constants.steepness = (constants.angle * 2 * Math.PI) / 360;

    constants.hsl = groupValueColor.HSL;
    // console.log(constants.hsl[0] + "  " + constants.hsl[1] + "  " + constants.hsl[2]);
};


/* Set Background for Adjusment Bar */
pickerUntil.setBackgroundAdjusmentSaturation = function (bgColor) {
    $('div#slider_saturation').css({
        'background-image': '-ms-linear-gradient(left, #CCCCCC 0%, ' + bgColor + ' 100%)',
        'background-image': '-moz-linear-gradient(left, #CCCCCC 0%, ' + bgColor + ' 100%)',
        'background-image': '-o-linear-gradient(left, #CCCCCC 0%, ' + bgColor + ' 100%)',
        'background-image': '-webkit-gradient(linear, left top, right top, color-stop(0, #CCCCCC), color-stop(1, ' + bgColor + '))',
        'background-image': '-webkit-linear-gradient(left, #CCCCCC 0%, ' + bgColor + ' 100%)',
        'background-image': 'linear-gradient(to right, #CCCCCC 0%, ' + bgColor + ' 100%)',
    })
};

pickerUntil.setBackgroundAdjusmentValue = function (bgColor) {
    $('div#slider_value').css({
        'background-image': '-ms-linear-gradient(left, #000000 0%, ' + bgColor + ' 100%)',
        'background-image': '-moz-linear-gradient(left, #000000 0%, ' + bgColor + ' 100%)',
        'background-image': '-o-linear-gradient(left, #000000 0%, ' + bgColor + ' 100%)',
        'background-image': '-webkit-gradient(linear, left top, right top, color-stop(0, #000000), color-stop(1, ' + bgColor + '))',
        'background-image': '-webkit-linear-gradient(left, #000000 0%, ' + bgColor + ' 100%)',
        'background-image': 'linear-gradient(to right, #000000 0%, ' + bgColor + ' 100%)',
    })
};

pickerUntil.setBackgroundAdjusmentIntensity = function (bgColor) {
    $('div#slider_int').css({
        'background-image': '-ms-linear-gradient(left, rgb(127,127,255) 0%, ' + bgColor + ' 100%)',
        'background-image': '-moz-linear-gradient(left, rgb(127,127,255) 0%, ' + bgColor + ' 100%)',
        'background-image': '-o-linear-gradient(left, rgb(127,127,255) 0%, ' + bgColor + ' 100%)',
        'background-image': '-webkit-gradient(linear, left top, right top, color-stop(0, rgb(127,127,255)), color-stop(1, ' + bgColor + '))',
        'background-image': '-webkit-linear-gradient(left, rgb(127,127,255) 0%, ' + bgColor + ' 100%)',
        'background-image': 'linear-gradient(to right, rgb(127,127,255) 0%, ' + bgColor + ' 100%)',
    })
};


/* Find Position of Cursor */
pickerUntil.findPos = function (in_obj) {
    var left = 0;
    var top = 0;

    if (in_obj.offsetParent) {
        do {
            left += in_obj.offsetLeft;
            top += in_obj.offsetTop;
        }
        while (in_obj = in_obj.offsetParent);
    }

    return [left, top];
};


pickerUntil.downEvent = function (e) {
    constants.mouse_event = true;
    if (constants.distance <= 96) {
        if (constants.distance > 77.5) {
            constants.wheel_circle = true;
            constants.wheel_rhombus = false;
        }
        else if (constants.distance <= 75) {
            constants.wheel_circle = false;
            constants.wheel_rhombus = true;
        }
    }
    pickerUntil.setWheel(e);
};

pickerUntil.moveEvent = function (e) {
    pickerUntil.colorEvent(e);
};

pickerUntil.upEvent = function (e) {
    constants.mouse_event = false;
    constants.wheel_circle = false;
    constants.wheel_rhombus = false;
};

pickerUntil.setWheel = function (e) {
    if (constants.distance <= 96) {
        if (constants.id_menu == "#Adjusment_Wheel") {
            if (constants.distance > 80 && constants.wheel_circle) {
                constants.typeactive = "cursorWheel";
                pickerUntil.colorEvent(e, constants.tag_canvas, constants.cont_canvas);
                
                var size = 150;
                var half = size / 2;
                var radius = half;
                constants.cont_canvas_wheel.clearRect(0, 0, size, size);
                // Rhombus Inside
                constants.cont_canvas_wheel.beginPath();
                constants.cont_canvas_wheel.moveTo(0, half);
                constants.cont_canvas_wheel.lineTo(half, 0);
                constants.cont_canvas_wheel.lineTo(size, half);
                constants.cont_canvas_wheel.lineTo(half, size);
                constants.cont_canvas_wheel.lineTo(0, half);
                var linearGradient = constants.cont_canvas.createLinearGradient(0, 0, size, size);
                linearGradient.addColorStop(0, constants.colorofwheel);
                linearGradient.addColorStop(1, constants.colorofwheel);
                constants.cont_canvas_wheel.fillStyle = linearGradient;
                constants.cont_canvas_wheel.fill();
                constants.cont_canvas_wheel.drawImage(constants.img_canvas_wheel, 0, 0, constants.img_canvas_wheel.width, constants.img_canvas_wheel.height);

            }
            else if (constants.distance <= 75 && constants.wheel_rhombus) {
                constants.typeactive = "canvasWheel";
                pickerUntil.colorEvent(e, constants.tag_canvas_wheel, constants.cont_canvas_wheel);
            }
        } else {
            constants.typeactive = "canvasNomal";
            pickerUntil.colorEvent(e, constants.tag_canvas, constants.cont_canvas);
        }
    }
};

/* Update Value Color ......... */
pickerUntil.colorEvent = function (e, tagCanvas, contCanvas) {
    var canvasOffset = $(tagCanvas).offset();
    var canvasX = Math.floor(e.pageX - canvasOffset.left);
    var canvasY = Math.floor(e.pageY - canvasOffset.top);
    /* get current pixel */
    var imageData = contCanvas.getImageData(canvasX, canvasY, 1, 1);
    var pixel = imageData.data;
    var rgbColor = "rgb(" + pixel[0] + ", " + pixel[1] + ", " + pixel[2] + ")";

    pickerUntil.setValueTextFromBackgroundRGB(rgbColor);

    /* Set Cursor at Current Pixel */
    // If Picker is Spectrum, Grayscale Or Normal
    if (constants.id_menu != "#Adjusment_Wheel") {
        if (constants.typeactive == "canvasNomal") {
            $("#" + constants.id_cursor).css({ left: (canvasX - 8) + "px", top: (canvasY - 8) + "px", });
        }
    }
    else {
        // If Picker is Wheel
        // If Contex is Picker Canvas
        if (contCanvas == constants.cont_canvas) {
            if (constants.typeactive == "cursorWheel") {
                $("#" + constants.id_cursor_wheel).css({
                    left: (Math.round(Math.sin(constants.steepness) * 88 + 206 / 2)) + 'px',
                    top: (Math.round(-Math.cos(constants.steepness) * 88 + 206 / 2) - 3) + 'px'
                });
                constants.colorofwheel = rgbColor;
            }
            // If Contex is Rhomus Canvas
        } else {
            if (constants.typeactive == "canvasWheel"
                && pixel[0] != 0 && pixel[1] != 0 && pixel[2] != 0) {
                $("#" + constants.id_cursor).css({
                    left: (canvasX + 30) + "px",
                    top: (canvasY + 30) + "px",
                });

                constants.wheel_save.left = canvasX + 30;
                constants.wheel_save.top = canvasY + 30;
            }
        }
    }

    /* update text and preview color */
    (constants.color_enable) ? $('.color1').css('backgroundColor', rgbColor) : $('.color2').css('backgroundColor', rgbColor);
    
    (constants.color_enable) ? pickerUntil.setGradientFromBackgroundRGB('.color1') : pickerUntil.setGradientFromBackgroundRGB('.color2');
    pickerUntil.setBackgroundAdjusmentSaturation(rgbColor);
    pickerUntil.setBackgroundAdjusmentValue(rgbColor);
    pickerUntil.setBackgroundAdjusmentIntensity(rgbColor);
};

