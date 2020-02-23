// component import
import EntryTable from "./components/EntryTable.vue"
import CategoryView from "./components/CategoryView.vue"
import CategoryEntryTable from "./components/CategoryEntryTable.vue"
import RandomEntry from "./components/RandomEntry.vue"
import EntryDetailed from "./components/EntryDetailed.vue"
import AboutMe from "./components/AboutMe.vue"

// route specification
const routes = [
    {path: '/', component: EntryTable, displayName: "Home"},
    {path: '/category', component: CategoryView, displayName: "Categories"}, 
    {path: '/category/:categoryName', component: CategoryEntryTable, props: true},
    {path: '/random', component: RandomEntry, displayName: "Random Entry"},
    {path: '/about', component: AboutMe, displayName: "About Me"},
    {
        path: '/entry', 
        name: "detailedEntry",
        component: EntryDetailed, 
        props: true
    },
    
];

export default routes;