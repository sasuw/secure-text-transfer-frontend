function isVisible(e) {
    return !!( e.offsetWidth || e.offsetHeight || e.getClientRects().length );
}

function isElementVisible (el, holder) {
    holder = holder || document.body
    const { top, bottom, height } = el.getBoundingClientRect()
    const holderRect = holder.getBoundingClientRect()
  
    return top <= holderRect.top
      ? holderRect.top - top <= height
      : bottom - holderRect.bottom <= height
  }

function show(elId) {
    let el = document.getElementById(elId);
    if (el == null || el.style == null) {
        log('No element with id ' + elId + ' found');
        return;
    }
    if (el.style.visibility === 'hidden') {
        el.style.visibility = 'unset';
    } else if (el.style.display === 'none') {
        el.style.display = 'block';
    }
}

function hide(elId) {
    let el = document.getElementById(elId);
    if (el == null || el.style == null) {
        log('No element with id ' + elId + ' found');
        return;
    }
    if (el.style.visibility === 'unset') {
        el.style.visibility = 'hidden';
    } else if (el.style.display === 'block' || el.style.display === '') {
        el.style.display = 'none';
    }
}

function dgel(elId){
    return document.getElementById(elId);
}