function convertHexCodeToLightness(hexCode)
{
    var r = parseInt(hexCode.substring(1, 3), 16),
        g = parseInt(hexCode.substring(3, 5), 16),
        b = parseInt(hexCode.substring(5, 7), 16);
    
    r /= 255, g /= 255, b /= 255;

    var max = Math.max(r, g, b),
        min = Math.min(r, g, b),
        l = (max + min) / 2;

    return Math.floor(l * 100);
}

function rgbToLightness(rgbCode)
{

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


(function ($) {
        $.fn.getSaturation = function (options) {

        var settings = $.extend({}, {
            type        : "rgb",
            colourType  : "background",
            darkClass   : "dark",
            lightClass  : "light",
            percentage  : 50     
        }, options);

        this.each(function (index, element) {
                    
            switch(settings.colourType){
                case "color" :
                    var colourElement = $(element).css('color')
                    break;

                default:
                    var colourElement = $(element).css('background-color')
                    break;
            }

            switch(settings.colourType){
                case "hex" :
                    var lightness = convertHexCodeToLightness(colourElement);  
                    break;

                default:
                    var lightness = rgbToLightness(colourElement);  
                    break;
            }


            $(element).attr("data-saturation", lightness);

            if (lightness > settings.percentage){
                $(element).addClass(settings.lightClass);
            }else{
                $(element).addClass(settings.darkClass);
            }

        });
    }    
})(jQuery);

