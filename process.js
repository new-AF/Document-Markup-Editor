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
const v0= '0.0.1';
const v = ' '+v0;


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

/*section.file-selecion.form.input*/
f=d.querySelector('#filepicker')
section=f.parentElement;
main=section.parentElement;

section.addEventListener('dragenter', e => {
	section.classList.add('dragenter')
	//e.preventDefault();
	//console.log(e);
})

section.addEventListener('dragleave', e => {
if ( e.relatedTarget==main || e.relatedTarget==null )
	section.classList.remove('dragenter');
	console.log(e.relatedTarget);
	//e.preventDefault();
})

section.ondrop = e=> {
	e.preventDefault();console.log(e);
}

/*First span inside section.file-selection*/
s = d.querySelector('.file-selection > span')
s.style.display="block";

sp='.txt .pdf .html .htm'
f.setAttribute('accept' , sp.replace(/ /g,',') )
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
d.title+= v;


const w=window
const T = true
const F = !T

create = (i) => d.createElement(i)

each = (x,y) => x.forEach( i => y(i) )

function put(...args) {

    console.log('>',...args,'<')
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


function get(i) {

    check(i,"string")

    f = d.querySelectorAll
    //put('f.call',f)
    f = f.call(d,i)

    return f
}

function children(i) {

    if (typeis(i,'string'))
        i = get(i)
    //put('children',i)
    c = Array.from(i.children)
    return c
}

const entries = i => Object.entries(i)

f.addEventListener('change',function(e) {
	t = e.currentTarget

	$(get('.file-selection')[0]).fadeOut('fast')
	$('.file-info').fadeToggle('fast')
	ch = $('.file-info > *').not('.R').children('.row > div:nth-child(2)');
	//ch.each( (i,el) => $(el) )
	//put(ch)
	c = 0
	n = []
	for (i of t.files) {
		$(ch[c++]).text(i.name)
		n.push(i.name)
		$(ch[c++]).text(i.type)
		$(ch[c++]).text(i.size)
		$(ch[c++]).text(new Date(i.lastModified))
	}
	p = n.filter(i => i.endsWith('.pdf'))
	x = n.filter(i => i.endsWith('.txt'))
	h = n.filter(i => i.endsWith('.htm'))
	put(p,x,h)

	c=0 ;
	[p,x,h].forEach(i => {
		put('***',i)
		bu = $(`.B${++c}`)
		cc = bu.children().last()
		bu.show()
		i.forEach( j => { cc.text(j); bu.append(cc.clone()) } )
	})

})
$( function DocumentReady() { /*$('.file-info ').hide()*/ } );
