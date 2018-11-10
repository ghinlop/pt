class InputClass {
    constructor(target, data) {
        this.target = target
    }
    inputRender() {
        let target = $(this.target);
        let input = target.find('input')
        let label = target.find('label')
        function checkInput() {
            var valueLength = input.val();

            if (valueLength !== '') {
                label.addClass('active')
            } else {
                label.removeClass('active')
            }
        }
        input.change(function () {
            checkInput()
        })
        input.ready(function () {
            checkInput()
        })
    }
}

var isInput = $('[gh-input]')
if (isInput.length > 0) {
    for (let i of isInput) {
        new InputClass($(i)).inputRender()
    }
}
var slt_cb_all = $('table td input[type=checkbox]'),
    eventCheckbox = $('table input#all')[0],
    totalCheckbox = slt_cb_all.length
$(eventCheckbox).on('click', (e) =>{
  if(e.target.checked){
    checkAllTarget(slt_cb_all)
  }else{
    for(let i of slt_cb_all){
      uncheckAllTarget(slt_cb_all)
    }
  }
})
$('table td input[type=checkbox]').on('click', (e) => {
  if(!e.target.checked){
    uncheckAllTarget(slt_cb_all)
    eventCheckbox.checked = false
  }else{
    let getChecked = $('table td input[type=checkbox]:checked').length
    if(totalCheckbox === getChecked){
      eventCheckbox.checked = true
    }
  }
})
function checkAllTarget(data){
  if(data.length > 0){
    for(let i of data){
      i.checked = true
    }
  }
}
function uncheckAllTarget(data){
  if(data.length > 0){
    for(let i of data){
        i.checked = ''
    }
  }
}
