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
const v = v0+' ';

c = function(e) {
	x = e.target
	w = x.offsetWidth
	h = x.offsetHeight
	col = e.screenX%255
	coll = e.screenY%255

	x.style.color = `rgb(${coll},${col},${col})`
}
t=d.querySelector('body>header')
t.addEventListener('mousemove',c)

f=d.querySelector('.file-selection')
f.addEventListener('dragenter', e => {

	if (!f.classList.contains('dragenter'))
			f.classList.add('dragenter')
	//console.log('000000000000')
})

f.addEventListener('dragleave', e => {
if (e.relatedTarget==f)
	f.classList.remove('dragenter')
})

s = d.querySelector('.file-selection span')

'txt pdf html'.split(' ').forEach( e => {x=d.createElement('span');
x.textContent = e.toUpperCase(); x.style.display = 'block';s.appendChild(x);
 t.append} )

d.querySelector('footer').children[0].textContent+= v;
d.title+= v;
