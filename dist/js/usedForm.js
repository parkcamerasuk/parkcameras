var additionalItems = ['Battery', 'Charger', 'Body Cap', 'Strap', 'Lens Hood', 'Lens Cap (Front)', 'Lens Cap (Rear)', 'Manual', 'Box (Original)', 'Cables (USB/etc)'];
var conditions = ['Like New', 'Excellent', 'Very Good', 'Good', 'Well Used'];
var itemCount = 0;

$(function() { // jQuery ready
    // Add 1 item's inputs as soon as the page loads
    addItem();

    // Add 1 more whenever 'another' link is clicked
    $('.new-item').click(addItem);

    // Make double-submission less likely
    $('form').submit(function(e) {
        $('button').attr('disabled', 'disabled');
        return true;
    })
});

function makeLabel(label, inputId, cssClass, appendedHtml) {
    var theLabel = $('<label>').attr('for', inputId).text(label);
    if(cssClass) {
        theLabel.attr('class', cssClass);
    }
    if(appendedHtml) {
      theLabel.append(appendedHtml)
    }
    return theLabel;
}

function addItem() {
    var newItem = $('<div>').attr({
        'name': 'items[' + itemCount + ']'
    });

    if(itemCount > 0) {
        $('<hr>').appendTo(newItem);
    }

    // Indicate first 2 fields as required but don't enforce this except on 1st item -
    // we can just ignore any subsequent ones that are not filled in

    var nameId = 'item_' + itemCount + '_name';
    makeLabel('Make & Model*', nameId).appendTo(newItem);
    var newName = $('<input>').attr({
        'type': 'text',
        'id': nameId,
        'name': 'items[' + itemCount + '][name]'
    });
    if(itemCount == 0) {
        newName.attr('required', 'required');
    }
    newName.appendTo(newItem);

    var conditionId = 'item_' + itemCount + '_condition';
    makeLabel('Condition*', conditionId, false, '<a style="display: block" href="https://www.parkcameras.com/krishna#condition">Need help?</a>').appendTo(newItem);
    var newCondition = $('<select>').attr({
        'id': conditionId,
        'name': 'items[' + itemCount + '][condition]'
    });
    if(itemCount == 0) {
        newCondition.attr('required', 'required');
    }
    for(var ii = 0; ii < conditions.length; ii++) {
        $('<option value="' + conditions[ii] + '">').text(conditions[ii]).appendTo(newCondition);
    }
    newCondition.appendTo(newItem);

    var commentsId = 'item_' + itemCount + '_comments';
    makeLabel('Additional comments', commentsId).appendTo(newItem);
    $('<textarea>').attr({
        'id': commentsId,
        'name': 'items[' + itemCount + '][comments]'
    }).appendTo(newItem);

    var accessoriesId = 'item_' + itemCount + '_accessories';
    makeLabel('Accessories included:', accessoriesId).appendTo(newItem);
    var newAccessoriesBlock = $('<div>').attr({
        'id': accessoriesId,
        'class': 'additionalItemSection'
    });
    for(var jj = 0; jj < additionalItems.length; jj++) {
        var newContainer = $('<div>').attr('class', 'accessoryContainer');
        var accessoryId = 'item_' + itemCount + '_accessory_' + jj;
        $('<input>').attr({
            'id': accessoryId,
            'name': 'items[' + itemCount + '][accessories][' + jj + ']',
            'type': 'checkbox',
            'class': 'additionalItem',
            'value': additionalItems[jj]
        }).appendTo(newContainer);
        makeLabel(additionalItems[jj], accessoryId, 'additionalItemLabel').appendTo(newContainer);
        newContainer.appendTo(newAccessoriesBlock);
    }
    newAccessoriesBlock.appendTo(newItem);

    newItem.appendTo('.pc-usedFormItems');
    itemCount++;
    return false;
}

function expandAndPopulateForms(jsonData) {
    $.each(jsonData, function(formKey, formValue) {
        if(formKey === 'items') {
            var itemNum = 0;

            $.each(formValue, function() {
                if (itemNum >= itemCount) {
                    addItem();
                }

                $.each(this, function(itemKey, itemValue) {
                    if(itemKey === 'accessories') {
                        $.each(itemValue, function(accessoryKey, accessoryValue) {
                            $('#item_' + itemNum + '_accessory_' + accessoryKey).attr('checked', 'checked');
                        });
                    } else {
                        $('#item_' + itemNum + '_' + itemKey).val(itemValue);
                    }
                });

                itemNum++;
            });
        } else {
            $('[name="' + formKey + '"]').val(formValue);
        }
    });
}