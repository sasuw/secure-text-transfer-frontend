function selectText(id, doAfterSelectFunction) {
	var sel, range;
	var el = document.getElementById(id); //get element id
	if (window.getSelection && document.createRange) { //Browser compatibility
		sel = window.getSelection();
		if (sel.toString() == '') { //no text selection
			window.setTimeout(function () {
				range = document.createRange(); //range object
				range.selectNodeContents(el); //sets Range
				sel.removeAllRanges(); //remove all ranges from selection
				sel.addRange(range);//add Range to a Selection.

				if(doAfterSelectFunction != null){
					doAfterSelectFunction();
				}
			}, 1);
		}
	} else if (document.selection) { //older ie
		sel = document.selection.createRange();
		if (sel.text == '') { //no text selection
			range = document.body.createTextRange();//Creates TextRange object
			range.moveToElementText(el);//sets Range
			range.select(); //make selection.

			if(doAfterSelectFunction != null){
				doAfterSelectFunction();
			}
		}
	}
}

function ocCopy() {
	/*
	var range = document.createRange();
	range.selectNode(document.getElementById('ocp'));
	window.getSelection().removeAllRanges(); // clear current selection
	window.getSelection().addRange(range); // to select text
	*/
	let doAfterSelectFunction = function(){
		document.execCommand('copy');
	}
	selectText('ocp', doAfterSelectFunction);
	

	var copyButtonEl = document.getElementById('copyButton');
	copyButtonEl.innerHTML = ' <strong>copied</strong>';
	window.setTimeout(function () {
		window.getSelection().removeAllRanges();// to deselect
	}, 1000);
	window.setTimeout(function () {
		copyButtonEl.innerHTML = 'Copy';
	}, 3000);

}

function ocClose() {
	hide('overlay');
}

function showTextInOverlay(text) {
	if (text == null) {
		text = document.getElementById('ocp').innerText;
	}
	window.ocpTxt = text.trim();

	document.getElementById('ocp').innerText = window.ocpTxt;
	show('overlay');

	//dynamic size adjustment
	/*
	if(text.length > 500){
		let oc = dgel('overlayContainer');
		if(text.length < 1000){
			oc.style.width = '30vw';
			oc.style.height = '60vh';
		}else{
			oc.style.width = '40vw';
			oc.style.height = '80vh';
		}
	}
	*/

	let transparentGif = document.getElementById('tg');
	let overlayContainer = document.getElementById('overlayContainer');
	let tgIsVisible = isElementVisible(transparentGif, overlayContainer); //text is so long that we need a bottom row of buttons
	if (!tgIsVisible) {
		show('ocButtonContainerBottom');
	}
}