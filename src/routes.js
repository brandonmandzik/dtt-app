// component import
import EntryTable from "./components/EntryTable.vue"
import CategoryView from "./components/CategoryView.vue"
import CategoryEntryTable from "./components/CategoryEntryTable.vue"
import RandomEntry from "./components/RandomEntry.vue"


// route specification
const routes = [
    {path: '/', component: EntryTable},
    {path: '/category', component: CategoryView},
    {path: '/category/:categoryName', component: CategoryEntryTable, props: true},
    {path: '/random', component: RandomEntry},
    
];

export default routes;