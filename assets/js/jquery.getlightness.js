var Lightness = {
    convertHexCodeToLightness : function (hexCode) {
        var r = parseInt(hexCode.substring(1, 3), 16),
            g = parseInt(hexCode.substring(3, 5), 16),
            b = parseInt(hexCode.substring(5, 7), 16);

        r /= 255; g /= 255; b /= 255;

        var max = Math.max(r, g, b),
            min = Math.min(r, g, b),
            l = (max + min) / 2;

        return Math.floor(l * 100);
    },
    convertRgbToLightness : function (rgb) {
        var c = rgbCode;
        var rgb = c.match(/\d+/g);

        var r = rgb[0],
            g = rgb[1],
            b = rgb[2];

        r /= 255, g /= 255, b /= 255;

        var max = Math.max(r, g, b),
            min = Math.min(r, g, b),
            l = (max + min) / 2;

        return Math.floor(l * 100);
    }
};

(function ($) {
    $.fn.getLightness = function (options) {

        var settings = $.extend({}, {
            type: "rgb",
            colourType: "background",
            darkClass: "dark",
            lightClass: "light",
            percentage: 50
        }, options);

        this.each(function (index, element) {

            var colourElement,
                lightnessValue;

            switch (settings.colourType) {
                case "color" :
                    colourElement = $(element).css('color')
                    break;

                default:
                    colourElement = $(element).css('background-color')
                    break;
            }

            switch (settings.colourType) {
                case "hex" :
                    lightnessValue = Lightness.convertHexCodeToLightness(colourElement);
                    break;

                default:
                    lightnessValue = Lightness.convertRgbToLightness(colourElement);
                    break;
            }


            $(element).data("lightness", lightnessValue);

            if (lightnessValue > settings.percentage) {
                $(element).addClass(settings.lightClass).removeClass(settings.darkClass);
            } else {
                $(element).addClass(settings.darkClass).removeClass(settings.lightClass);
            }

        });
    }
})(jQuery);

