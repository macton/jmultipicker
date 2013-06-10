pickerMain = function () {
};

pickerMain.Init = function () {
    constants.tag_canvas = document.getElementById(constants.id_canvas);
    constants.cont_canvas = constants.tag_canvas.getContext('2d');
    constants.tag_canvas_wheel = document.getElementById(constants.id_canvas_wheel);
    constants.cont_canvas_wheel = constants.tag_canvas_wheel.getContext('2d');
};

pickerMain.Load = function () {
    pickerMain.Draw();
    setTimeout(function () {
        $("div#navigatorPicker ul li a").each(function (index) {
            if (index == 0) {
                $(this).on('click', function () {
                    pickerMain.menuClickHandle($(this));
                });
                $(this).trigger('click');
            }
        });
    }, 500);
};

pickerMain.Draw = function () {
    var srcImage = (!constants.images_mooth) ? constants.images_src1 : constants.images_src2;
    constants.img_canvas.onload = function() {
        constants.cont_canvas.drawImage(constants.img_canvas, 0, 0, constants.img_canvas.width, constants.img_canvas.height);
    };
    constants.img_canvas.src = srcImage;
};

pickerMain.drawColorPicker = function () {
    $('#' + constants.id_cursor_wheel).hide();
    $('#' + constants.id_canvas_wheel).hide();
    if (constants.id_menu == "#Adjusment_Spectrum") {
        pickerMain.drawCanvasSpectrum();
        if (!constants.images_mooth) {
            if (!pickerInit.spectrum_first) {
                setTimeout(function () {
                    pickerInit.spectrum_first = true;
                    pickerMain.drawCanvasSpectrum();
                }, 500);
            }
        } else {
            if (!pickerInit.spectrum_second) {
                setTimeout(function () {
                    pickerInit.spectrum_second = true;
                    pickerMain.drawCanvasSpectrum();
                }, 500);
            }
        }
    }
    else if (constants.id_menu == "#Adjusment_Wheel") {
        $('#' + constants.id_cursor_wheel).show();
        $('#' + constants.id_canvas_wheel).show();

        if (constants.wheel_save.top != null) {
            $("#" + constants.id_cursor).css({
                left: (constants.wheel_save.left) + "px",
                top: (constants.wheel_save.top) + "px",
            });
        }
        else {
            $("#" + constants.id_cursor).css({
                left: "105px",
                top: "105px",
            });
        }

        pickerMain.drawCanvasWheel();
        if (!constants.images_mooth) {
            if (!pickerInit.while_first) {
                setTimeout(function () {
                    pickerInit.while_first = true;
                    pickerMain.drawCanvasWheel();
                }, 500);
            }
        } else {
            if (!pickerInit.while_second) {
                setTimeout(function () {
                    pickerInit.while_second = true;
                    pickerMain.drawCanvasWheel();
                }, 500);
            }
        }
    } else if (constants.id_menu == "#Adjusment_Gray") {
        pickerMain.drawCanvasGrayscale();
        if (!constants.images_mooth) {
            if (!pickerInit.grayscale_first) {
                setTimeout(function () {
                    pickerInit.grayscale_first = true;
                    pickerMain.drawCanvasGrayscale();
                }, 500);
            }
        }
        else {
            if (!pickerInit.grayscale_second) {
                setTimeout(function () {
                    pickerInit.grayscale_second = true;
                    pickerMain.drawCanvasGrayscale();
                }, 500);
            }
        }
    } else if (constants.id_menu == "#Adjusment_Normals") {
        pickerMain.drawCanvasNormal();
        if (!constants.images_mooth) {
            if (!pickerInit.normal_first) {
                setTimeout(function () {
                    pickerInit.normal_first = true;
                    pickerMain.drawCanvasNormal();
                }, 500);
            }
        }
        else {
            if (!pickerInit.normal_second) {
                setTimeout(function () {
                    pickerInit.normal_second = true;
                    pickerMain.drawCanvasNormal();
                }, 500);
            }
        }
    }
};

pickerMain.menuClickHandle = function (linkIsClicked) {
    $(linkIsClicked).click(function () {
        var _this = $(this);
        constants.images_src1 = _this.attr('getsrcimage');
        if (constants.images_src1 === "" || constants.images_src1 === "undefine") return false;
        constants.images_src2 = _this.attr('getsrcimagestepped');
        $(linkIsClicked).removeClass('menuActive');
        _this.addClass('menuActive');
        constants.id_menu = _this.attr('idadjustment');
        pickerMain.displayAjustment(constants.id_menu);
        pickerMain.drawColorPicker();
        return true;
    });
};

pickerMain.displayAjustment = function (idAjustment) {
    $('div#Adjustment > div:not(' + idAjustment + ')').hide();
    $('div#Adjustment > div' + idAjustment).show();
};

pickerMain.colorGradientClick = function (groupGradient, idColorIsSet) {
    $(groupGradient).click(function () {
        var rgbColor = $(this).css('backgroundColor');
        $(idColorIsSet).css('backgroundColor', rgbColor);
        pickerUntil.setValueTextFromBackgroundRGB(rgbColor);
    });
};

pickerMain.optionTab = function (linkSelector) {
    $(linkSelector).click(function () {
        var href = $(this).attr('href');
        var idTab = href.replace('#/', '#');
        pickerMain.showTabOption(idTab);
        $(linkSelector).removeClass('menuActive');
        $(this).addClass('menuActive');
    })
};

pickerMain.showTabOption = function (idTab) {
    $('div#zoneOptionEdt > div:not(' + idTab + ')').hide();
    $('div#zoneOptionEdt > div' + idTab).show();
};

/* Draw with Adjusment Of Spectrum */
pickerMain.drawCanvasSpectrum = function () {
    constants.cont_canvas.clearRect(0, 0, 225, 225);
    var srcImage = (!constants.images_mooth) ? constants.images_src1 : constants.images_src2;
    constants.img_canvas.src = srcImage;
    constants.cont_canvas.drawImage(constants.img_canvas, 0, 0, constants.img_canvas.width, constants.img_canvas.height);
    var size = 225;
    var half = size / 2;
    var centerX = half;
    var centerY = half;
    var radius = half - 15;
    constants.percentS = $("div#slider_saturation").slider("value");
    constants.percentV = $("div#slider_value").slider("value");
    constants.percentF = $("div#slider_fade").slider("value");
    constants.sVal = (parseFloat(constants.percentS) / 100).toFixed(2).replace('.00', '');
    constants.vVal = (parseFloat(constants.percentV) / 100).toFixed(2).replace('.00', '');
    constants.fVal = (parseFloat(constants.percentF) / 100).toFixed(2).replace('.00', '');
    $('#saturationVal').val(parseInt(constants.sVal * 100));
    $('#valueVal').val(constants.vVal);
    $('#fadeValue').val(constants.fVal);
    /* Draw Saturation Value */
    constants.cont_canvas.beginPath();
    constants.cont_canvas.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    var radialGradient = constants.cont_canvas.createRadialGradient(half, half, 0, half, half, half);
    radialGradient.addColorStop(0, 'hsla(255, 100%, 100%,0)');
    radialGradient.addColorStop(1, 'hsla(0, 0%, 0%,' + ((-constants.percentS) / 100) + ')');
    constants.cont_canvas.fillStyle = radialGradient;
    constants.cont_canvas.fill();
    /* Draw Value Value */
    constants.cont_canvas.beginPath();
    constants.cont_canvas.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    var radialGradient = constants.cont_canvas.createRadialGradient(half, half, 0, half, half, half);
    radialGradient.addColorStop(0, 'hsla(0, 0%, 0%, ' + (1 - constants.vVal) + ')');
    radialGradient.addColorStop(1, 'hsla(0, 0%, 0%,' + (1 - constants.vVal) + ')');
    constants.cont_canvas.fillStyle = radialGradient;
    constants.cont_canvas.fill();
    /* Draw Fade Point Value */
    constants.cont_canvas.beginPath();
    constants.cont_canvas.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    var radialGradient = constants.cont_canvas.createRadialGradient(half, half, 0, half, half, half);
    radialGradient.addColorStop(0, 'hsla(0, 0%, ' + constants.percentF + '%, ' + (1 - constants.fVal) + ')');
    radialGradient.addColorStop(1, 'hsla(255, 0%, 0%,0)');
    constants.cont_canvas.fillStyle = radialGradient;
    constants.cont_canvas.fill();
};

/* Draw with Adjusment Of Wheel */
pickerMain.drawCanvasWheel = function () {
    constants.cont_canvas.clearRect(0, 0, 225, 225);
    var srcImage = (!constants.images_mooth) ? constants.images_src1 : constants.images_src2;
    constants.img_canvas.src = srcImage;
    constants.cont_canvas.drawImage(constants.img_canvas, 0, 0, constants.img_canvas.width, constants.img_canvas.height);
    pickerMain.drawRhombusWheel(constants.colorofwheel);
};

pickerMain.drawRhombusWheel = function (rgbColor) {
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
    linearGradient.addColorStop(0, rgbColor);
    linearGradient.addColorStop(1, rgbColor);
    constants.cont_canvas_wheel.fillStyle = linearGradient;
    constants.cont_canvas_wheel.fill();
    // Draw Overlay
    var srcImage = (!constants.images_mooth) ? constants.images_src1_wheel : constants.images_src2_wheel;
    constants.img_canvas_wheel.src = srcImage;
    constants.cont_canvas_wheel.drawImage(constants.img_canvas_wheel, 0, 0, constants.img_canvas_wheel.width, constants.img_canvas_wheel.height);
};

/* Draw with Adjusment Of GrayScale*/
pickerMain.drawCanvasGrayscale = function () {
    constants.cont_canvas.clearRect(0, 0, 225, 225);
    var srcImage = (!constants.images_mooth) ? constants.images_src1 : constants.images_src2;
    constants.img_canvas.src = srcImage;
    constants.cont_canvas.drawImage(constants.img_canvas, 0, 0, constants.img_canvas.width, constants.img_canvas.height);
    var size = 225;
    var half = size / 2;
    var centerX = half;
    var centerY = half;
    var radius = half - 15;
    constants.percentH = $("div#slider_hight").slider("value");
    constants.percentL = $("div#slider_low").slider("value");
    constants.hVal = (parseFloat(constants.percentH) / 100).toFixed(2).replace('.00', '');
    constants.lVal = (parseFloat(constants.percentL) / 100).toFixed(2).replace('.00', '');
    $('#hightVal').val(constants.hVal);
    $('#lowVal').val(constants.lVal);
    /* Draw Hight Value */
    constants.cont_canvas.beginPath();
    constants.cont_canvas.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    var radialGradient = constants.cont_canvas.createRadialGradient(half, half, 0, half, half, half);
    radialGradient.addColorStop(0, 'hsla(0, 0%, 0%, ' + (1 - constants.hVal) + ')');
    radialGradient.addColorStop(1, 'hsla(0, 0%, 0%,' + (1 - constants.hVal) + ')');
    constants.cont_canvas.fillStyle = radialGradient;
    constants.cont_canvas.fill();
    /* Draw Low Value */
    constants.cont_canvas.beginPath();
    constants.cont_canvas.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    var radialGradient = constants.cont_canvas.createRadialGradient(half, half, 0, half, half, half);
    radialGradient.addColorStop(0, 'hsla(255, 100%, 100%, ' + (constants.lVal) + ')');
    radialGradient.addColorStop(1, 'hsla(255, 100%, 100%,' + (constants.lVal) + ')');
    constants.cont_canvas.fillStyle = radialGradient;
    constants.cont_canvas.fill();
};

/* Draw with Adjusment Of Normal */
pickerMain.drawCanvasNormal = function () {
    constants.cont_canvas.clearRect(0, 0, 225, 225);
    var srcImage = (!constants.images_mooth) ? constants.images_src1 : constants.images_src2;
    constants.img_canvas.src = srcImage;
    constants.cont_canvas.drawImage(constants.img_canvas, 0, 0, constants.img_canvas.width, constants.img_canvas.height);
    var size = 225;
    var half = size / 2;
    var centerX = half;
    var centerY = half;
    var radius = half - 15;
    constants.percentI = $("div#slider_int").slider("value");
    constants.iVal = (parseFloat(constants.percentI) / 100).toFixed(2).replace('.00', '');
    $('#intVal').val(constants.iVal);
    /* Draw Intensity Value */
    constants.cont_canvas.beginPath();
    constants.cont_canvas.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    var radialGradient = constants.cont_canvas.createRadialGradient(half, half, 0, half, half, half);
    radialGradient.addColorStop(0, 'hsla(255, 80%, 60%, ' + (1 - constants.iVal) + ')');
    radialGradient.addColorStop(1, 'hsla(255, 80%, 60%,' + (1 - constants.iVal) + ')');
    constants.cont_canvas.fillStyle = radialGradient;
    constants.cont_canvas.fill();
};

$(document).ready(function () {
    pickerInit.spectrum_first = false;
    pickerInit.spectrum_second = false;
    pickerInit.grayscale_first = false;
    pickerInit.grayscale_second = false;
    pickerInit.normal_first = false;
    pickerInit.normal_second = false;
    pickerInit.while_first = false;
    pickerInit.while_second = false;
    pickerInit.outover = true;
    pickerMain.Init();
    pickerMain.Load();
    (constants.color_enable) ? pickerUntil.setValueTextFromBackgroundRGB($('.color1').css('backgroundColor')) : pickerUntil.setValueTextFromBackgroundRGB($('.color2').css('backgroundColor'));
    (constants.color_enable) ? pickerUntil.setGradientFromBackgroundRGB('.color1') : pickerUntil.setGradientFromBackgroundRGB('.color2');
    pickerMain.menuClickHandle('div#navigatorPicker ul li a');

    $('.color1').mousedown(function (e) {
        constants.color_enable = true;
        pickerUntil.setValueTextFromBackgroundRGB($('.color1').css('backgroundColor'));
        (constants.color_enable) ? $('.color1').addClass('colorActive') : $('.color2').addClass('colorActive');
        (constants.color_enable) ? $('.color2').removeClass('colorActive') : $('.color1').removeClass('colorActive');
    });
    $('.color2').mousedown(function (e) {
        constants.color_enable = false;
        pickerUntil.setValueTextFromBackgroundRGB($('.color2').css('backgroundColor'));
        (constants.color_enable) ? $('.color1').addClass('colorActive') : $('.color2').addClass('colorActive');
        (constants.color_enable) ? $('.color2').removeClass('colorActive') : $('.color1').removeClass('colorActive');
    });
    $('div#zoneOptionViewImage').mousedown(function (event) {
        event.preventDefault();
        constants.images_mooth = !constants.images_mooth;
        (!constants.images_mooth) ? $('div#zoneOptionViewImage').css('background', 'url("images/smooth.png") repeat scroll 0 0 transparent') : $('div#zoneOptionViewImage').css('background', 'url("images/stepped.png") repeat scroll 0 0 transparent');
        pickerMain.drawColorPicker();
    });


    // setup event
    window.addEventListener("mousedown", function (e) {
        constants.mouse_pos = new Vector(e.clientX - pickerUntil.div_pos[0], e.clientY - pickerUntil.div_pos[1]);
        constants.distance = Vector.Distance(constants.mouse_pos, constants.mouse_center);
        (constants.distance > 96) ? $("#" + constants.id_canvas).css({ cursor: "default" }) : $("#" + constants.id_canvas).css({ cursor: "pointer" });

        pickerUntil.downEvent(e);
    }, false);

    window.addEventListener("mousemove", function (e) {
        constants.mouse_pos = new Vector(e.clientX - pickerUntil.div_pos[0], e.clientY - pickerUntil.div_pos[1]);
        constants.distance = Vector.Distance(constants.mouse_pos, constants.mouse_center);
        (constants.distance > 96) ? $("#" + constants.id_canvas).css({ cursor: "default" }) : $("#" + constants.id_canvas).css({ cursor: "pointer" });
        if (constants.mouse_event) {
            pickerUntil.setWheel(e);
        }
    }, false);

    window.addEventListener("mouseup", function (e) {
        pickerUntil.upEvent(e);
    }, false);

    window.addEventListener("resize", function () {
        pickerUntil.div_pos = pickerUntil.findPos(constants.tag_canvas);
    }, false);
    window.addEventListener("orientationchange", function () {
        pickerUntil.div_pos = pickerUntil.findPos(constants.tag_canvas);
    }, false);

    pickerUntil.setGradientFromBackgroundRGB('.color1');
    pickerUntil.setGradientFromBackgroundRGB('.color2');

    pickerMain.showTabOption('#Adjustment');
    pickerMain.optionTab('div#zoneOptionGetValue ul li a');

    /* Set Color For Primary Color Value when Click Value At Gradient Color */
    pickerMain.colorGradientClick('div#GradientLine1 div', '.color1');
    pickerMain.colorGradientClick('div#GradientLine2 div', '.color2');

    /*  ADJUSTMENT SPECTRUMP */
    $("div#slider_saturation").slider({
        orientation: "horizontal",
        min: -100,
        max: 0,
        value: 0,
        slide: pickerMain.drawCanvasSpectrum,
        change: pickerMain.drawCanvasSpectrum,
    });
    $("div#slider_value").slider({
        orientation: "horizontal",
        min: 0,
        max: 100,
        value: 100,
        slide: pickerMain.drawCanvasSpectrum,
        change: pickerMain.drawCanvasSpectrum,
    });
    $("div#slider_fade").slider({
        orientation: "horizontal",
        min: 0,
        max: 100,
        value: 100,
        slide: pickerMain.drawCanvasSpectrum,
        change: pickerMain.drawCanvasSpectrum,
    });

    /*  ADJUSTMENT GRAY */
    $("div#slider_hight").slider({
        orientation: "horizontal",
        min: 0,
        max: 100,
        value: 100,
        slide: pickerMain.drawCanvasGrayscale,
        change: pickerMain.drawCanvasGrayscale,
    });
    $("div#slider_low").slider({
        orientation: "horizontal",
        min: 0,
        max: 100,
        value: 0,
        slide: pickerMain.drawCanvasGrayscale,
        change: pickerMain.drawCanvasGrayscale,
    });

    /*  ADJUSTMENT INTENSITY */
    $("div#slider_int").slider({
        orientation: "horizontal",
        min: 0,
        max: 100,
        value: 100,
        slide: pickerMain.drawCanvasNormal,
        change: pickerMain.drawCanvasNormal,
    });
});
