import { createRouter, createWebHistory } from 'vue-router'
import Login from "../views/Login.vue"
import Dashboard from "../views/Dashboard.vue"
import Register from "../views/Register.vue"
import Courses from "../views/Courses.vue"
import UserLectures from "../views/UserLectures.vue"
import University from "../components/University.vue"
import CourseView from "../views/CourseView.vue"
import PageMissing from "../views/PageMissing.vue"

const userInfo = JSON.parse(localStorage.getItem("userInfo" ) as string)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/account/login',
      name: 'login',
      component: Login,
      
    },
    {
        path: '/account/register',
        name: 'register',
        component: Register
        
    },
    {
      path:"/:catchAll(.*)",
      name:"error",
      component: PageMissing
    },

    {
      path: "/",
      name : "home",
      component: Dashboard
    },
    {
      path:"/courses",
      name: "courses",
      component: Courses,
      
    },
    {
      path: "/my/lectures",
      name: "My Lectures",
      component : UserLectures
    },
    {
      path:"/university/:university",
      name:"Univeristy",
      component: University
    },
    {
      path:"/course/:courseId/lectures",
      name:"LectureRecordings",
      component:CourseView
    },
  ]
  
})



export default router
