define([
    'angular'
], function (ng) {
    'use strict';
    return ng.module('mfPrint', [])
        .directive('mfPrint', [function () {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    element.bind('click', function (e) {
                        e.preventDefault();
                        prepareElem(attrs.printer, attrs.header, attrs.styles);
                    });
                    function prepareElem(elem, header, styles) {
                        PrintWithIframe($(elem).html(), header, styles);
                    }
                    function PrintWithIframe(data, header, styles) {
                        if (data) {
                            $('body').append('<iframe id="printf" name="printf"></iframe>');
                            var mywindow = window.frames["printf"];
                            mywindow.document.write('<html><head><title>' + header + '</title>' + styles + '</head><body><div class="table-data-to-print">' + data + '</div></body></html>');
                            $(mywindow.document).ready(function () {
                                setTimeout(function () {
                                    mywindow.print();
                                    setTimeout(function () {
                                            $('iframe#printf').remove();
                                        },
                                        5000);
                                }, 1000);
                            });
                        }
                        return true;
                    }
                }
            };
        }]);
});