import IndexPage from '../views/IndexPage.vue'
import GolfCourseList from '../views/GolfCourseList.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: IndexPage
  },
  {
    path: '/golf-courses',
    name: 'golf-courses',
    component: GolfCourseList
  }
];

export default routes;