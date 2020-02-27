[TOC]

# Introduction

###### 	@Author: Brandon Mandzik

###### @Date: 25th Feb 2020

###### @NOTE: for full user-experience -> use a markdown editor like "Typora"



This application serves as a **UI project** for the **backend API** "*api.publicapis.org*".
The reason for the development is that I hand in this application as my *result* for the *application test*. 
The backend provides categorized data about many public APIs which can be explored with the help of the Webpage. *Feel free to discover them all!*
The development process consists of intensive use of *VueJS* for the Front-End logic and the help of *Bootstrap* for prototyping the UI. 

Inside the project directory run the following from your CLI to start the server:

```js
npm run serve // will run the server
```





## TOOLS



### VueJS

https://vuejs.org
VueJS is a **progressiv component-based** *Javascript Front-End Framework*. It's capable of powering sophisticated *Single-Page Applications* up. I used it to build the Webpage from gound up. It's very handy to build new components and arranging them.



#### Vue Router

https://router.vuejs.org
The Vue Router is used for displaying the correct components to the user. with the Tags <router-link> and <router-view> you can *easily* **switch** beetween components depending on the clicked *router-link*.



### Bootstrap

https://getbootstrap.com
Bootstrap is a responsive, mobile first open-source toolkit for quickly **prototyping** ideas or building entire apps. I used it because of I'm already familiar with it and know how to use it. Native CSS is possible but it came in very handy for this task.  Note that I only relied on the *css part* of it.





## ROUTES



The application contains a *routes.js* file which holds a r**outes[] object** with the paths for the VueRouter. In the file firstly we need to import all components and then in the object we *specify* the paths with several **parameters** like _path_, _component_, _displayName_, etc.

the routes[] object looks like this:

```js
const routes = [
    {path: '/', component: EntryTable, displayName: "Home"},
    {path: '/category', component: CategoryView, displayName: "Categories"}, 
    // Category needs a deeper routing
    // We pass the category name in the url to use it as a prop and query param
    {path: '/category/:categoryName', component: CategoryEntryTable, props: true},
    {path: '/random', component: RandomEntry, displayName: "Random Entry"},
    {path: '/about', component: AboutMe, displayName: "About Me"},
    // entry is named so that we can pass objets to the props
    {
        path: '/entry', 
        name: "detailedEntry",
        component: EntryDetailed, 
        props: true
    },
];
```





## COMPONENTS



### **App.vue**

App.vue is the **main** **component** that is injected to the *index.html* file. It's taking care of displaying the correct components to the end-user with the help of the VueRouter. The VueRouter provides the tags: 

```html
<router-link to=""></router-link> // routing on click to a path from router.js
<router-view/> // displays the mapped component 
```

They are used in the Navbar as the <a> tag.  In the beginning we place our **background video** and make it fullscreen. 
The **footer** displays all relatable links to the user. They are pulled from the routes[] array. The routes[] comes from the routes imported from routes.js.



### Entry-Table

Entry-Table is the component mapped to the **home view**. It contains a sort button, a info card with a description about the application and ten random entries from *api.publicapis.org* .
As data it contains an array object named __entries[]__ which hold the random entries. Before the component gets mounted it calls the *getAPIs()* function which fetches *one random* entry *at the time* in a loop and appends it to entries[].

The sortEntries...() methods are calling the corresponding *computed funcitons* which are returning the entries[] object **sorted** by the API property.

Every Entry contains a *stretched-link* which is a <router-link> :

```html
<router-link :to="{name: 'detailedEntry', params: {entry: entry}}" class="stretched-link"></router-link>
```

We gave the **EntryDetail** component a *named path* so that we can pass objects to the props.



### Category-View

Category-view is the component mapped to the **category view** which the user can access from the *navbar*. The html holds a jumbotron card which is basically just a bigger card that becomes more *awareness* from the user.  Inside of the html we *loop* through all category-names with the help of the **categories[] data**. 

Before the component is mounted we call the *getCategories()* function which calls the /categories endpoint. The result is a json[] that holds all names as a string. The **category-names** are getting *displayed* as a <router-link> so that we can reveal after a click the list of all entries that are *specified* to the user selected category. 

```html
  <router-link 
        v-for="category in categories"
        :key="category"
        class="btn btn-secondary btn-lg m-1"
        role="button"
        :to="'/category/'+category" // we use a v-bind here to have a dynamic parameter
      >{{category}}</router-link>
```



### CategoryEntryTable

CategoryEntryTable is *very similar* to the home view. It also contain **buttons** but this time a back and sort button. The content are all *entries* in from the data **entries[]**. Also before mounted we call *getCategoryEntries()* so that we have all entries with the *specified category*. 
There is **one problem**. The user can click on a category which is splitted in two "**phrases**" with a "**&**" inbetween. This string can be problematic to pass as a query-parameter, so we need to scan the categoryName which comes as a prop. If it holds "&" we just take the *first word* otherwise we take the string as it comes.
With the **refinedCategoryName** we than can make our endpoint-call and get our Entries. 
In addition to that the component also uses the same architecture for the sorting logic. 

```js
methods: {
	async sortEntriesASC() {
    this.entries = this.sortedArrayASC;
  },
  async sortEntriesDESC() {
  	this.entries = this.sortedArrayDESC;
  }
},
computed: {
    // computed functions for returning sorted entries[]
    sortedArrayASC: function() {
      function compare(a, b) {
        if (a.API < b.API) return -1;
        if (a.API > b.API) return 1;
        return 0;
     	}
      const clone = [].concat(this.entries);
      return clone.sort(compare);
    },
    sortedArrayDESC: function() {
      function compare(a, b) {
        if (a.API < b.API) return 1;
        if (a.API > b.API) return -1;
        return 0;
      }
      const clone = [].concat(this.entries);
      return clone.sort(compare);
    }
  }
```



### EntryDetailed

EntryDetailed is the component which is mapped to display when the **user clickes** on one of the *minified entry cards*. The template holds a **back button**, a major **card** which displays all information about the API entry and three **related cards**. Related means they share the same *category.* 
So before the component gets mounted we need to *retrieve* our data. When the user clicks on a minified version of an entry, he passes the *entry as a prop*to the EntryDetailed component. That means we hold the entry in our props as an object already. Next thing is to call the /entry-endpoint with the same category that our main entry has. The **categoryName** is taken from our entry object that contains a poperty named "category". 

When the User clicks on a related entry the function **reloadComponent()** is invoked which takes a parameter (the relatedEntry) and assignes it to the entry object. Then we call the refreshRelatedEntries() function that is similar to **getRelatedEntries()** but it clears the **relatedEntries[]** data before assigning the new data.

```js
// same as getRelatedAPIs()
// DIFFERENCE: is clearing the relatedEntries[] 
async refreshRelatedEntries() {
  const refinedCategoryName =
        this.entry.Category.indexOf("&") == -1
  ? this.entry.Category
  : this.entry.Category.substring(0, this.entry.Category.indexOf("&"));
  const response = await fetch(
    "https://api.publicapis.org/entries?category=" + refinedCategoryName
  );
  const data = await response.json();
  const relatedEntriesArray = data["entries"];
  this.relatedEntries = [];
  for (let i = 0; i < 3; i++) {
    const random = Math.floor(Math.random() * relatedEntriesArray.length);
    this.relatedEntries = [
      ...this.relatedEntries,
      relatedEntriesArray[random]
    ];
  }
},
```



### RandomEntry

RandomEntry is the component mapped to the **random view** which the user can access from the navbar. 
The component is *similar* to the **EntryDetailed** component. It just *simplified* because there is only one **entry** displayed to the user and there are no relatedEntries that are displayed here. The user has only one **button** and it's the re-roll button to get a new random entry form the API. The entry card displays all information given by the API. The component only has one function which is the **getRandomEntry()** function that fetches a new entry. 

````js
async getRandomEntry() {
  const response = await fetch("https://api.publicapis.org/random");
  const data = await response.json();
  this.entry = data["entries"][0];
}
````



### AboutMe	

AboutMe is the last component of the application and is mapped to the **aboutMe view** which the user can access from the navbar. its bootstrap card that holds a **picture** and few **information** about myself. For further information feel free to **contact** me (brandon.m@gmx.de).



