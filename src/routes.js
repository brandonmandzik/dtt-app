// component import
import EntryTable from "./components/EntryTable.vue"
import CategoryView from "./components/CategoryView.vue"
import CategoryEntryTable from "./components/CategoryEntryTable.vue"
import RandomEntry from "./components/RandomEntry.vue"
import EntryDetailed from "./components/EntryDetailed.vue"


// route specification
const routes = [
    {path: '/', component: EntryTable},
    {path: '/category', component: CategoryView},
    {path: '/category/:categoryName', component: CategoryEntryTable, props: true},
    {path: '/random', component: RandomEntry},
    {
        path: '/entry/', 
        name: "detailedEntry",
        component: EntryDetailed, 
        props: true
    },
    
];

export default routes;