/*
    Document Markup Editor, A Document Editor in HTML+JS+CSS
    Copyright (C) 2019  Abdullah Fatota

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
const d=document;
const __version__= '0.0.1';

function set_version_on_title(x){

	t = d.title.split(' ');
	t[t.length-1] = ' '+x;

	d.title = t.join('')
}

set_version_on_title(__version__)


button = d.querySelector(".choose")
c = function(e) {
	x = e.target
	let w = x.offsetWidth
	h = x.offsetHeight
	col = e.screenX%255
	coll = e.screenY%255

	x.style.color = `rgb(${coll},${col},${col})`
}

header=d.querySelector('body header h1')
header.addEventListener('mousemove',c)

file_input=d.querySelector('#filepicker')
section=file_input.parentElement;
main=section.parentElement;

section.addEventListener('dragenter', e => {
	section.classList.add('dragenter')
	//e.preventDefault();
	//console.log(e);
})

section.addEventListener('dragleave', e => {
if ( e.relatedTarget==main || e.relatedTarget==null )
	section.classList.remove('dragenter');
	//console.log(e.relatedTarget);
	//e.preventDefault();
})

section.ondrop = e=> {
	e.preventDefault();console.log(e);
}

/*First span inside section.file-selection*/
s = d.querySelector('.file-selection > span')
s.style.display="block";

sp='.txt .pdf .html .htm'
file_input.setAttribute('accept' , sp.replace(/ /g,',') )
//console.log(picker.attributes.accept)
sp.split(' ').forEach(
x => {
e=d.createElement('span');
e.textContent = x.toUpperCase();
e.style.display = 'block';
s.appendChild(e);
} )
s.children[1].innerHTML= `<abbr title="(PDF) Portable Document Format, an ISO specification for Documents Interchange developed at the beginning by Adobe">PDF</abbr>`
//d.querySelector('footer').children[0].textContent+= v;

create = (i) => d.createElement(i)

each = (x,y) => x.forEach( i => y(i) )

function put(...args) {

    console.log('>',...args,'<')
}

function get(x, single = false) {

	check(x,"string")

	t = d.querySelectorAll(x)

	if (t.length == 0) {
			put('[get] no matching selector found',`(${x})`)
			return null
		}

	return single? t[0] : t

		}

function gets(x){
	return get(x,single = true)
}
function typeis(i,type) {

    return typeof(i) === type
}

function check(i,type, hardno) {

    if (!typeis(i,type))
        console.trace(`[check] i is not (${type}) (${i})`)

    if (hardno)
        throw `[check] hardno is (${hardno})`

}

function range(a,b) {
    try {
        [a, b] = a
    }

    catch (e) {

    }
    return [a,b]
}

function children(i) {

    if (typeis(i,'string'))
        i = get(i)
    //put('children',i)
    c = Array.from(i.children)
    return c
}

function add_row_classes(x, from = 1){
	//put(x)
	p = x[0].parentElement
  p.Rows = []
	c = from
	for (i of x){
		i.classList.add(`row${c}`)
		p.Rows.push(i)
		c++
	}
}
add_row_classes(get('.file-info>*'))
class Read {

}

//function
function text_width(x){
	canvas = d.createElement('canvas')
	c = canvas.getContext('2d')
	c.font = '16px tahoma'
	v = c.measureText(x)
	canvas.remove()
	return v.width
}

function fill_(e){
	w = e.currentTarget

	file = w.File

	r = gets('.file-info').Rows
	c = 1
	//put('**',file,typeof(file))
	for (i of 'name type Size LastModified'.split(' ')) {
		//put('fill_',i)
		r[c++].lastElementChild.innerText = file[i]
	}
}

function add_tabs(e) {
	p = gets('.file-info').Rows[0]

	div_last=p.lastElementChild

	div = p.firstElementChild

	files = e.currentTarget.files

	c = 0
	for (i of files) {

		c++

		j = div.cloneNode(true) ; if (c==1) j = div;
		jj = j.firstElementChild
		Name = i.name
		PrefixPos = Name.lastIndexOf('.')
		Prefix = Name.slice(PrefixPos)
		jj.FullName = Name
		j.File = i			/*Each tab gets a copy of its info*/


		j.File.SizeInUnits = [j.File.size + ' Byte(s)', parseFloat(j.File.size / 1024).toFixed(2) + ' KB'] /*using 1KB == 1024 convention*/

		j.File.Size =  j.File.SizeInUnits[ Number(j.File.size > 1024 )  ]
		j.File.LastModified = j.File.lastModifiedDate.toLocaleString()
		tw = text_width(Name)
		if (tw>120) {
			y = tw / Name.length
			len = parseInt(120/y)
			Name = Name.slice(0,len - 3 - Prefix.length ) + '...'+Prefix
		}
		jj.innerText = Name
		if (c==1)		continue;
		p.insertBefore(j,div_last)

		j.onclick = fill_
	}

	div.click()
}


//add_classes(get('.tab1 > *'))

file_input.onchange = function(e) { add_tabs(e); /*fill_(e);*/ }
// file_input.addEventListener('change',function(e) {
// 	t = e.currentTarget
//
// 	$(get('.file-selection')[0]).fadeOut('fast')
// 	$('.file-info').fadeToggle('fast')
// 	ch = $('.file-info > *').not('.R').children('.row > div:nth-child(2)');
// 	//ch.each( (i,el) => $(el) )
// 	//put(ch)
// 	c = 0
// 	n = []
// 	for (i of t.files) {
// 		$(ch[c++]).text(i.name)
// 		n.push(i.name)
// 		$(ch[c++]).text(i.type)
// 		$(ch[c++]).text(i.size)
// 		$(ch[c++]).text(new Date(i.lastModified))
// 	}
// 	p = n.filter(i => i.endsWith('.pdf'))
// 	x = n.filter(i => i.endsWith('.txt'))
// 	h = n.filter(i => i.endsWith('.htm'))
// 	put(p,x,h)
//
// 	c=0 ;
// 	[p,x,h].forEach(i => {
// 		put('***',i)
// 		bu = $(`.B${++c}`)
// 		cc = bu.children().last()
// 		bu.show()
// 		i.forEach( j => { cc.text(j); bu.append(cc.clone()) } )
// 	})
//
// })
$( function DocumentReady() { /*$('.file-info ').hide()*/ } );
