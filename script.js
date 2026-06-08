let blogs =
JSON.parse(
localStorage.getItem("blogs")
) || [];

renderBlogs();

const contentBox =
document.getElementById("content");

contentBox.addEventListener(
"input",
function(){

document.getElementById(
"charCount"
).innerHTML =

`✍️ ${this.value.length} Characters`;

}
);

function addBlog(){

let title =
document.getElementById(
"title"
).value.trim();

let category =
document.getElementById(
"category"
).value;

let content =
document.getElementById(
"content"
).value.trim();

if(
title === "" ||
content === ""
){

alert(
"⚠️ Please fill all fields"
);

return;
}

let words =
content.split(/\s+/).length;

let readTime =
Math.max(
1,
Math.ceil(words / 200)
);

let blog = {

id:
Date.now(),

title,

category,

content,

readTime,

date:
new Date()
.toLocaleString()

};

blogs.unshift(blog);

saveBlogs();

renderBlogs();

clearForm();

alert(
"🎉 Blog Published Successfully!"
);
}

function renderBlogs(){

const container =
document.getElementById(
"blogContainer"
);

const blogCount =
document.getElementById(
"blogCount"
);

blogCount.innerHTML =

`📚 Total Blogs: ${blogs.length}`;

container.innerHTML = "";

if(
blogs.length === 0
){

container.innerHTML =

`
<div class="empty-state">

<h2>
📝 No Blogs Published Yet
</h2>

<p>
Create your first amazing blog post!
</p>

</div>
`;

return;
}

blogs.forEach(blog => {

container.innerHTML +=

`
<div class="blog-card">

<span class="category">
${blog.category}
</span>

<h2>
${blog.title}
</h2>

<p class="blog-content">
${blog.content}
</p>

<div class="blog-meta">

📅 ${blog.date}

<br>

⏱ ${blog.readTime}
min read

</div>

<button
class="delete-btn"
onclick="deleteBlog(${blog.id})"
>

🗑 Delete Blog

</button>

</div>
`;

});

}

function deleteBlog(id){

let confirmDelete =

confirm(
"Delete this blog?"
);

if(
!confirmDelete
)
return;

blogs =
blogs.filter(

blog =>
blog.id !== id

);

saveBlogs();

renderBlogs();

}

function searchBlogs(){

const searchText =

document
.getElementById(
"search"
)
.value
.toLowerCase();

const container =

document
.getElementById(
"blogContainer"
);

const filteredBlogs =

blogs.filter(blog =>

blog.title
.toLowerCase()
.includes(searchText)

||

blog.content
.toLowerCase()
.includes(searchText)

||

blog.category
.toLowerCase()
.includes(searchText)

);

container.innerHTML = "";

if(
filteredBlogs.length === 0
){

container.innerHTML =

`
<div class="empty-state">

<h2>
🔍 No Matching Blog Found
</h2>

<p>
Try another keyword.
</p>

</div>
`;

return;
}

filteredBlogs.forEach(blog => {

container.innerHTML +=

`
<div class="blog-card">

<span class="category">
${blog.category}
</span>

<h2>
${blog.title}
</h2>

<p class="blog-content">
${blog.content}
</p>

<div class="blog-meta">

📅 ${blog.date}

<br>

⏱ ${blog.readTime}
min read

</div>

<button
class="delete-btn"
onclick="deleteBlog(${blog.id})"
>

🗑 Delete Blog

</button>

</div>
`;

});

}

function saveBlogs(){

localStorage.setItem(

"blogs",

JSON.stringify(
blogs
)

);

}

function clearForm(){

document.getElementById(
"title"
).value = "";

document.getElementById(
"content"
).value = "";

document.getElementById(
"charCount"
).innerHTML =

"✍️ 0 Characters";

}