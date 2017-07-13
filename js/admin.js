(function ( $ ) {

	'use strict';

	$(function () {

        var $categoryDivs = $('.categorydiv');

		$categoryDivs
            .prepend('<input type="search" class="fc-search-field" placeholder="' + fc_plugin.placeholder + '" style="width: 100%" />');

        var selectItem = '<select class="fc-select-field"  style="width: 100%" ><option value="-1">Alle</option>';
        var $parentListItems = $('#kbe_taxonomychecklist').children('li');
        $parentListItems.each(function() {
            var label = $(this).children('label').text();
            selectItem = selectItem + '<option value="' + label + '">' + label + '</option>';

        });
        selectItem = selectItem + '</select>';

        $categoryDivs.prepend(selectItem);

        var filter = function(searchTerm, selectedParentItem) {

            var $listItems = $('.fc-search-field').parent().find('.categorychecklist li');

            if (selectedParentItem === "-1") {
                $listItems.show();
            }

            if ($.trim(searchTerm)) {

                $listItems.hide();
                $listItems.each(function() {
                    if ($(this).children('label').text().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                        $(this).parents('li').show();
                        $(this).children().find('li').show();           
                        $(this).show();

                        //$(this).children().find('li').show();
                        //$(this).next().find('li').show();
                    }

                });

            } else {

                $listItems.show();

            }
            if (selectedParentItem !== "-1") {
                $('#kbe_taxonomychecklist').children('li').each(function() {
                    if($(this).children('label').text() !== selectedParentItem) {
                        $(this).hide();
                    } else {
                        $(this).show();
                    }
                });
            }            
        };
            

        $categoryDivs.on('keyup search', '.fc-search-field', function (event) {

            var searchTerm = event.target.value;
            var selectedParentItem = $('.fc-select-field').val();
            filter(searchTerm, selectedParentItem);

        });

        $categoryDivs.on('change', '.fc-select-field', function (event) {

            var searchTerm = $('.fc-search-field').val();
            var selectedParentItem = $('.fc-select-field').val();
            filter(searchTerm, selectedParentItem);

        });

	});

}(jQuery));
