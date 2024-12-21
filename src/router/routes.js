
import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from '../views/IndexPage.vue'
import IndexPageAA from '../views/IndexPageAA.vue'
import GolfCourseList from '../views/GolfCourseList.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => {
      // Check if it's Safari on mobile
      const isSafariMobile = /Safari/.test(navigator.userAgent) && 
                          //   /Mobile/.test(navigator.userAgent) && 
                             !/Chrome/.test(navigator.userAgent)
      
      return new Promise((resolve) => {
        resolve(isSafariMobile ? IndexPage : IndexPageAA);
      })
    }
  },
  {
    path: '/golf-courses',
    name: 'golf-courses',
    component: GolfCourseList
  }
];

export default routes;