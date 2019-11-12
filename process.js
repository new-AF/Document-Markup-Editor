
c = function(e) {
	x = e.target
	w = x.offsetWidth
	h = x.offsetHeight
	col = e.screenX%255
	coll = e.screenY%255
	
	x.style.color = `rgb(${coll},${col},${col})`
}
t=document.querySelector('body>header')
t.addEventListener('mousemove',c)