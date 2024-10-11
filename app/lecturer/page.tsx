'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Calendar as CalendarIcon, FileText, Users, PlusCircle, Clock, Bell, UserPlus, BarChart2, Settings } from 'lucide-react'
import { LineChart } from "recharts"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { toast } from "@/hooks/use-toast"
import withAuth from '@/lib/withAuth'
import { TrendingUp } from 'lucide-react'

interface Semester {
  name: string;
}

export default  function LecturerDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedCourses, setSelectedCourses] = useState(['CS301', 'CS205'])
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null)

  // Mock data
  const lecturer = {
    name: "Dr. Emily Parker",
    id: "LEC001",
    department: "Computer Science"
  }

  const upcomingClasses = [
    { id: 1, title: "Database Systems", time: "10:00 AM - 11:30 AM", room: "CS-101" },
    { id: 2, title: "Web Development", time: "2:00 PM - 3:30 PM", room: "CS-201" },
    { id: 3, title: "Algorithms", time: "4:00 PM - 5:30 PM", room: "CS-301" },
    { id: 4, title: "Machine Learning", time: "9:00 AM - 10:30 AM", room: "CS-401" },
    { id: 5, title: "Computer Networks", time: "11:00 AM - 12:30 PM", room: "CS-202" },
    { id: 6, title: "Software Engineering", time: "1:00 PM - 2:30 PM", room: "CS-302" },
    { id: 7, title: "Artificial Intelligence", time: "3:00 PM - 4:30 PM", room: "CS-402" },
    { id: 8, title: "Data Structures", time: "9:30 AM - 11:00 AM", room: "CS-103" },
    { id: 9, title: "Operating Systems", time: "12:00 PM - 1:30 PM", room: "CS-203" },
    { id: 10, title: "Computer Graphics", time: "2:30 PM - 4:00 PM", room: "CS-303" },
    { id: 11, title: "Cybersecurity", time: "10:30 AM - 12:00 PM", room: "CS-403" },
    { id: 12, title: "Mobile App Development", time: "1:30 PM - 3:00 PM", room: "CS-104" },
    { id: 13, title: "Cloud Computing", time: "3:30 PM - 5:00 PM", room: "CS-204" },
    { id: 14, title: "Big Data Analytics", time: "9:00 AM - 10:30 AM", room: "CS-304" },
    { id: 15, title: "Internet of Things", time: "11:30 AM - 1:00 PM", room: "CS-404" }
  ];
  
  const coursesTaught = [
    { id: "CS301", name: "Database Systems", students: 45 },
    { id: "CS205", name: "Web Development", students: 60 },
    { id: "CS401", name: "Algorithms", students: 35 },
    { id: "CS501", name: "Machine Learning", students: 40 },
    { id: "CS302", name: "Computer Networks", students: 55 },
    { id: "CS402", name: "Software Engineering", students: 50 },
    { id: "CS502", name: "Artificial Intelligence", students: 38 },
    { id: "CS303", name: "Data Structures", students: 65 },
    { id: "CS403", name: "Operating Systems", students: 42 },
    { id: "CS503", name: "Computer Graphics", students: 30 },
    { id: "CS304", name: "Cybersecurity", students: 48 },
    { id: "CS404", name: "Mobile App Development", students: 58 },
    { id: "CS504", name: "Cloud Computing", students: 36 },
    { id: "CS305", name: "Big Data Analytics", students: 44 },
    { id: "CS405", name: "Internet of Things", students: 32 }
  ];
  
  const recentAssignments = [
    { id: 1, title: "Database Design Project", course: "CS301", submitted: 40, total: 45 },
    { id: 2, title: "JavaScript Basics Quiz", course: "CS205", submitted: 58, total: 60 },
    { id: 3, title: "Algorithm Complexity Analysis", course: "CS401", submitted: 30, total: 35 },
    { id: 4, title: "Neural Network Implementation", course: "CS501", submitted: 35, total: 40 },
    { id: 5, title: "Network Protocol Simulation", course: "CS302", submitted: 50, total: 55 },
    { id: 6, title: "Agile Development Case Study", course: "CS402", submitted: 48, total: 50 },
    { id: 7, title: "Expert System Design", course: "CS502", submitted: 36, total: 38 },
    { id: 8, title: "Binary Tree Operations", course: "CS303", submitted: 62, total: 65 },
    { id: 9, title: "Process Scheduling Algorithm", course: "CS403", submitted: 40, total: 42 },
    { id: 10, title: "3D Rendering Techniques", course: "CS503", submitted: 28, total: 30 },
    { id: 11, title: "Encryption Methods Comparison", course: "CS304", submitted: 45, total: 48 },
    { id: 12, title: "Cross-Platform App Development", course: "CS404", submitted: 55, total: 58 },
    { id: 13, title: "Distributed Computing Essay", course: "CS504", submitted: 34, total: 36 },
    { id: 14, title: "Data Visualization Project", course: "CS305", submitted: 42, total: 44 },
    { id: 15, title: "Smart Home System Prototype", course: "CS405", submitted: 30, total: 32 }
  ];
  
  
  
  const courseDetails = [
    { courseCode: "CS301", courseTitle: "Database Systems", unit: 4 },
    { courseCode: "CS205", courseTitle: "Web Development", unit: 3 },
    { courseCode: "CS401", courseTitle: "Algorithms", unit: 4 },
    { courseCode: "CS501", courseTitle: "Machine Learning", unit: 4 },
    { courseCode: "CS302", courseTitle: "Computer Networks", unit: 3 },
    { courseCode: "CS402", courseTitle: "Software Engineering", unit: 4 },
    { courseCode: "CS502", courseTitle: "Artificial Intelligence", unit: 4 },
    { courseCode: "CS303", courseTitle: "Data Structures", unit: 3 },
    { courseCode: "CS403", courseTitle: "Operating Systems", unit: 4 },
    { courseCode: "CS503", courseTitle: "Computer Graphics", unit: 3 },
    { courseCode: "CS304", courseTitle: "Cybersecurity", unit: 3 },
    { courseCode: "CS404", courseTitle: "Mobile App Development", unit: 3 },
    { courseCode: "CS504", courseTitle: "Cloud Computing", unit: 3 },
    { courseCode: "CS305", courseTitle: "Big Data Analytics", unit: 4 },
    { courseCode: "CS405", courseTitle: "Internet of Things", unit: 3 }
  ];
  
  const performanceMetrics = [
    { studentId: "STU001", courseCode: "CS301", caTest: 20, attendance: 92, exam: 75, total: 95, grade: "A" },
    { studentId: "STU002", courseCode: "CS205", caTest: 18, attendance: 85, exam: 70, total: 86, grade: "B" },
    { studentId: "STU003", courseCode: "CS401", caTest: 16, attendance: 60, exam: 45, total: 65, grade: "D" },
    { studentId: "STU004", courseCode: "CS501", caTest: 22, attendance: 78, exam: 58, total: 80, grade: "B" },
    { studentId: "STU005", courseCode: "CS302", caTest: 15, attendance: 70, exam: 50, total: 68, grade: "C" },
    { studentId: "STU006", courseCode: "CS402", caTest: 23, attendance: 95, exam: 72, total: 93, grade: "A" },
    { studentId: "STU007", courseCode: "CS502", caTest: 19, attendance: 82, exam: 65, total: 83, grade: "B" },
    { studentId: "STU008", courseCode: "CS303", caTest: 21, attendance: 88, exam: 68, total: 87, grade: "B" },
    { studentId: "STU009", courseCode: "CS403", caTest: 20, attendance: 86, exam: 62, total: 82, grade: "B" },
    { studentId: "STU010", courseCode: "CS503", caTest: 17, attendance: 75, exam: 55, total: 72, grade: "C" },
    { studentId: "STU011", courseCode: "CS304", caTest: 14, attendance: 65, exam: 48, total: 62, grade: "D" },
    { studentId: "STU012", courseCode: "CS404", caTest: 22, attendance: 90, exam: 73, total: 92, grade: "A" },
    { studentId: "STU013", courseCode: "CS504", caTest: 16, attendance: 72, exam: 52, total: 70, grade: "C" },
    { studentId: "STU014", courseCode: "CS305", caTest: 24, attendance: 96, exam: 76, total: 96, grade: "A" },
    { studentId: "STU015", courseCode: "CS405", caTest: 18, attendance: 80, exam: 60, total: 78, grade: "B" }
  ];
  
  const studentInfo = [
    { id: "STU001", name: "Alice Johnson", cgp: 4.0, classification: "First Class" },
    { id: "STU002", name: "Bob Smith", cgp: 3.3, classification: "Second Class Upper" },
    { id: "STU003", name: "Charlie Brown", cgp: 1.0, classification: "Pass" },
    { id: "STU004", name: "Diana Ross", cgp: 3.0, classification: "Second Class Upper" },
    { id: "STU005", name: "Ethan Hunt", cgp: 2.0, classification: "Third Class" },
    { id: "STU006", name: "Fiona Gallagher", cgp: 3.8, classification: "First Class" },
    { id: "STU007", name: "George Wilson", cgp: 2.8, classification: "Second Class Lower" },
    { id: "STU008", name: "Hannah Montana", cgp: 3.5, classification: "Second Class Upper" },
    { id: "STU009", name: "Ian McKellen", cgp: 3.2, classification: "Second Class Upper" },
    { id: "STU010", name: "Julia Roberts", cgp: 2.5, classification: "Second Class Lower" },
    { id: "STU011", name: "Kevin Hart", cgp: 1.8, classification: "Third Class" },
      { id: "STU012", name: "Liam Neeson", cgp: 3.7, classification: "First Class" }
    ];

  
  const studentDetails = {
    STU001: {
      name: "Alice Johnson",
      currentSemester: "Second Semester, Year 3",
      semesters: [
        {
          name: "First Semester, Year 1",
          cgp: 3.5,
          courses: [
            { code: "CS101", name: "Introduction to Programming", grade: "A-" },
            { code: "CS102", name: "Computer Architecture", grade: "B+" },
            { code: "MATH101", name: "Calculus I", grade: "A" },
          ]
        },
        {
          name: "Second Semester, Year 1",
          cgp: 3.7,
          courses: [
            { code: "CS103", name: "Data Structures", grade: "A" },
            { code: "CS104", name: "Discrete Mathematics", grade: "A-" },
            { code: "MATH102", name: "Linear Algebra", grade: "B+" },
          ]
        },
        {
          name: "First Semester, Year 2",
          cgp: 3.8,
          courses: [
            { code: "CS201", name: "Object-Oriented Programming", grade: "A" },
            { code: "CS202", name: "Database Systems", grade: "A" },
            { code: "CS203", name: "Computer Networks", grade: "A-" },
          ]
        },
        {
          name: "Second Semester, Year 2",
          cgp: 3.9,
          courses: [
            { code: "CS204", name: "Operating Systems", grade: "A" },
            { code: "CS205", name: "Web Development", grade: "A" },
            { code: "CS206", name: "Algorithms", grade: "A-" },
          ]
        },
        {
          name: "First Semester, Year 3",
          cgp: 4.0,
          courses: [
            { code: "CS301", name: "Software Engineering", grade: "A" },
            { code: "CS302", name: "Artificial Intelligence", grade: "A" },
            { code: "CS303", name: "Computer Graphics", grade: "A" },
          ]
        },
        {
          name: "Second Semester, Year 3",
          cgp: 4.0,
          courses: [
            { code: "CS304", name: "Machine Learning", grade: "A" },
            { code: "CS305", name: "Cybersecurity", grade: "A" },
            { code: "CS306", name: "Cloud Computing", grade: "A" },
          ]
        },
      ],
      cgp: 4.0,
      attendance: 95,
      performanceData: [
        { course: "CS301", score: 95 },
        { course: "CS302", score: 98 },
        { course: "CS303", score: 96 },
        { course: "CS304", score: 94 },
        { course: "CS305", score: 97 },
      ],
    },
    
    STU002: {
      name: "Bob Smith",
      currentSemester: "Second Semester, Year 3",
      semesters: [
        {
          name: "First Semester, Year 1",
          cgp: 3.2,
          courses: [
            { code: "CS101", name: "Introduction to Programming", grade: "B" },
            { code: "CS102", name: "Computer Architecture", grade: "C" },
            { code: "MATH101", name: "Calculus I", grade: "B+" },
          ]
        },
        {
          name: "Second Semester, Year 1",
          cgp: 3.4,
          courses: [
            { code: "CS103", name: "Data Structures", grade: "B+" },
            { code: "CS104", name: "Discrete Mathematics", grade: "B" },
            { code: "MATH102", name: "Linear Algebra", grade: "B+" },
          ]
        },
        {
          name: "First Semester, Year 2",
          cgp: 3.3,
          courses: [
            { code: "CS201", name: "Object-Oriented Programming", grade: "A-" },
            { code: "CS202", name: "Database Systems", grade: "B" },
            { code: "CS203", name: "Computer Networks", grade: "C+" },
          ]
        },
        {
          name: "Second Semester, Year 2",
          cgp: 3.5,
          courses: [
            { code: "CS204", name: "Operating Systems", grade: "B+" },
            { code: "CS205", name: "Web Development", grade: "A" },
            { code: "CS206", name: "Algorithms", grade: "B" },
          ]
        },
        {
          name: "First Semester, Year 3",
          cgp: 3.8,
          courses: [
            { code: "CS301", name: "Software Engineering", grade: "A" },
            { code: "CS302", name: "Artificial Intelligence", grade: "A" },
            { code: "CS303", name: "Computer Graphics", grade: "B+" },
          ]
        },
        {
          name: "Second Semester, Year 3",
          cgp: 3.9,
          courses: [
            { code: "CS304", name: "Machine Learning", grade: "A" },
            { code: "CS305", name: "Cybersecurity", grade: "A" },
            { code: "CS306", name: "Cloud Computing", grade: "B+" },
          ]
        },
      ],
      cgp: 3.3,
      attendance: 90,
      performanceData: [
        { course: "CS301", score: 88 },
        { course: "CS302", score: 90 },
        { course: "CS303", score: 85 },
        { course: "CS304", score: 92 },
        { course: "CS305", score: 89 },
      ],
    },
  
    STU003: {
      name: "Charlie Brown",
      currentSemester: "Second Semester, Year 3",
      semesters: [
        {
          name: "First Semester, Year 1",
          cgp: 1.5,
          courses: [
            { code: "CS101", name: "Introduction to Programming", grade: "C" },
            { code: "CS102", name: "Computer Architecture", grade: "D" },
            { code: "MATH101", name: "Calculus I", grade: "F" },
          ]
        },
        {
          name: "Second Semester, Year 1",
          cgp: 1.0,
          courses: [
            { code: "CS103", name: "Data Structures", grade: "D" },
            { code: "CS104", name: "Discrete Mathematics", grade: "F" },
            { code: "MATH102", name: "Linear Algebra", grade: "C" },
          ]
        },
        {
          name: "First Semester, Year 2",
          cgp: 1.0,
          courses: [
            { code: "CS201", name: "Object-Oriented Programming", grade: "D" },
            { code: "CS202", name: "Database Systems", grade: "F" },
            { code: "CS203", name: "Computer Networks", grade: "C+" },
          ]
        },
        {
          name: "Second Semester, Year 2",
          cgp: 1.0,
          courses: [
            { code: "CS204", name: "Operating Systems", grade: "F" },
            { code: "CS205", name: "Web Development", grade: "D" },
            { code: "CS206", name: "Algorithms", grade: "C" },
          ]
        },
        {
          name: "First Semester, Year 3",
          cgp: 1.0,
          courses: [
            { code: "CS301", name: "Software Engineering", grade: "F" },
            { code: "CS302", name: "Artificial Intelligence", grade: "D" },
            { code: "CS303", name: "Computer Graphics", grade: "F" },
          ]
        },
        {
          name: "Second Semester, Year 3",
          cgp: 1.0,
          courses: [
            { code: "CS304", name: "Machine Learning", grade: "D" },
            { code: "CS305", name: "Cybersecurity", grade: "F" },
            { code: "CS306", name: "Cloud Computing", grade: "D" },
          ]
        },
      ],
      cgp: 1.0,
      attendance: 60,
      performanceData: [
        { course: "CS301", score: 50 },
        { course: "CS302", score: 55 },
        { course: "CS303", score: 40 },
        { course: "CS304", score: 30 },
        { course: "CS305", score: 45 },
      ],
    },
    
    STU004: {
      name: "Diana Ross",
      currentSemester: "Second Semester, Year 3",
      semesters: [
        {
          name: "First Semester, Year 1",
          cgp: 2.0,
          courses: [
            { code: "CS101", name: "Introduction to Programming", grade: "C" },
            { code: "CS102", name: "Computer Architecture", grade: "C" },
            { code: "MATH101", name: "Calculus I", grade: "C+" },
          ]
        },
        {
          name: "Second Semester, Year 1",
          cgp: 2.0,
          courses: [
            { code: "CS103", name: "Data Structures", grade: "C" },
            { code: "CS104", name: "Discrete Mathematics", grade: "C+" },
            { code: "MATH102", name: "Linear Algebra", grade: "C" },
          ]
        },
        {
          name: "First Semester, Year 2",
          cgp: 2.0,
          courses: [
            { code: "CS201", name: "Object-Oriented Programming", grade: "C+" },
            { code: "CS202", name: "Database Systems", grade: "C" },
            { code: "CS203", name: "Computer Networks", grade: "C" },
          ]
        },
        {
          name: "Second Semester, Year 2",
          cgp: 2.5,
          courses: [
            { code: "CS204", name: "Operating Systems", grade: "C+" },
            { code: "CS205", name: "Web Development", grade: "C+" },
            { code: "CS206", name: "Algorithms", grade: "C" },
          ]
        },
        {
          name: "First Semester, Year 3",
          cgp: 2.5,
          courses: [
            { code: "CS301", name: "Software Engineering", grade: "B" },
            { code: "CS302", name: "Artificial Intelligence", grade: "B+" },
            { code: "CS303", name: "Computer Graphics", grade: "B" },
          ]
        },
        {
          name: "Second Semester, Year 3",
          cgp: 2.5,
          courses: [
            { code: "CS304", name: "Machine Learning", grade: "B" },
            { code: "CS305", name: "Cybersecurity", grade: "B" },
            { code: "CS306", name: "Cloud Computing", grade: "B+" },
          ]
        },
      ],
      cgp: 2.0,
      attendance: 80,
      performanceData: [
        { course: "CS301", score: 78 },
        { course: "CS302", score: 85 },
        { course: "CS303", score: 82 },
        { course: "CS304", score: 79 },
        { course: "CS305", score: 80 },
      ],
    },
    STU005: {
      name: "Ethan Hunt",
      currentSemester: "Second Semester, Year 3",
      semesters: [
        {
          name: "First Semester, Year 1",
          cgp: 2.0,
          courses: [
            { code: "CS101", name: "Introduction to Programming", grade: "C" },
            { code: "CS102", name: "Computer Architecture", grade: "D" },
            { code: "MATH101", name: "Calculus I", grade: "C" },
          ]
        },
        {
          name: "Second Semester, Year 1",
          cgp: 1.5,
          courses: [
            { code: "CS103", name: "Data Structures", grade: "D" },
            { code: "CS104", name: "Discrete Mathematics", grade: "D" },
            { code: "MATH102", name: "Linear Algebra", grade: "C" },
          ]
        },
        {
          name: "First Semester, Year 2",
          cgp: 2.0,
          courses: [
            { code: "CS201", name: "Object-Oriented Programming", grade: "C" },
            { code: "CS202", name: "Database Systems", grade: "C" },
            { code: "CS203", name: "Computer Networks", grade: "C" },
          ]
        },
        {
          name: "Second Semester, Year 2",
          cgp: 2.0,
          courses: [
            { code: "CS204", name: "Operating Systems", grade: "C" },
            { code: "CS205", name: "Web Development", grade: "B" },
            { code: "CS206", name: "Algorithms", grade: "C+" },
          ]
        },
        {
          name: "First Semester, Year 3",
          cgp: 2.0,
          courses: [
            { code: "CS301", name: "Software Engineering", grade: "B" },
            { code: "CS302", name: "Artificial Intelligence", grade: "B" },
            { code: "CS303", name: "Computer Graphics", grade: "C" },
          ]
        },
        {
          name: "Second Semester, Year 3",
          cgp: 2.5,
          courses: [
            { code: "CS304", name: "Machine Learning", grade: "B" },
            { code: "CS305", name: "Cybersecurity", grade: "C" },
            { code: "CS306", name: "Cloud Computing", grade: "B+" },
          ]
        },
      ],
      cgp: 2.0,
      attendance: 70,
      performanceData: [
        { course: "CS301", score: 65 },
        { course: "CS302", score: 70 },
        { course: "CS303", score: 68 },
        { course: "CS304", score: 72 },
        { course: "CS305", score: 75 },
      ],
    },
    STU006: {
      name: "Fiona Gallagher",
      currentSemester: "Second Semester, Year 3",
      semesters: [
        {
          name: "First Semester, Year 1",
          cgp: 3.5,
          courses: [
            { code: "CS101", name: "Introduction to Programming", grade: "B" },
            { code: "CS102", name: "Computer Architecture", grade: "A" },
            { code: "MATH101", name: "Calculus I", grade: "A" },
          ]
        },
        {
          name: "Second Semester, Year 1",
          cgp: 3.8,
          courses: [
            { code: "CS103", name: "Data Structures", grade: "A" },
            { code: "CS104", name: "Discrete Mathematics", grade: "A" },
            { code: "MATH102", name: "Linear Algebra", grade: "B+" },
          ]
        },
        {
          name: "First Semester, Year 2",
          cgp: 3.7,
          courses: [
            { code: "CS201", name: "Object-Oriented Programming", grade: "A" },
            { code: "CS202", name: "Database Systems", grade: "B" },
            { code: "CS203", name: "Computer Networks", grade: "A" },
          ]
        },
        {
          name: "Second Semester, Year 2",
          cgp: 3.5,
          courses: [
            { code: "CS204", name: "Operating Systems", grade: "B+" },
            { code: "CS205", name: "Web Development", grade: "A" },
            { code: "CS206", name: "Algorithms", grade: "A" },
          ]
        },
        {
          name: "First Semester, Year 3",
          cgp: 3.5,
          courses: [
            { code: "CS301", name: "Software Engineering", grade: "A" },
            { code: "CS302", name: "Artificial Intelligence", grade: "A" },
            { code: "CS303", name: "Computer Graphics", grade: "B+" },
          ]
        },
        {
          name: "Second Semester, Year 3",
          cgp: 3.5,
          courses: [
            { code: "CS304", name: "Machine Learning", grade: "A" },
            { code: "CS305", name: "Cybersecurity", grade: "A" },
            { code: "CS306", name: "Cloud Computing", grade: "A" },
          ]
        },
      ],
      cgp: 3.5,
      attendance: 90,
      performanceData: [
        { course: "CS301", score: 90 },
        { course: "CS302", score: 92 },
        { course: "CS303", score: 88 },
        { course: "CS304", score: 95 },
        { course: "CS305", score: 93 },
      ],
    },
    STU007: {
      name: "George Wilson",
      currentSemester: "First Semester, Year 3",
      semesters: [
        {
          name: "First Semester, Year 1",
          cgp: 2.5,
          courses: [
            { code: "CS101", name: "Introduction to Programming", grade: "C" },
            { code: "CS102", name: "Computer Architecture", grade: "B" },
            { code: "MATH101", name: "Calculus I", grade: "C+" },
          ],
        },
        {
          name: "Second Semester, Year 1",
          cgp: 2.8,
          courses: [
            { code: "CS103", name: "Data Structures", grade: "B-" },
            { code: "CS104", name: "Discrete Mathematics", grade: "C+" },
            { code: "MATH102", name: "Linear Algebra", grade: "B" },
          ],
        },
        {
          name: "First Semester, Year 2",
          cgp: 2.9,
          courses: [
            { code: "CS201", name: "Object-Oriented Programming", grade: "B" },
            { code: "CS202", name: "Database Systems", grade: "C" },
            { code: "CS203", name: "Computer Networks", grade: "C" },
          ],
        },
        {
          name: "Second Semester, Year 2",
          cgp: 3.0,
          courses: [
            { code: "CS204", name: "Operating Systems", grade: "B+" },
            { code: "CS205", name: "Web Development", grade: "A-" },
            { code: "CS206", name: "Algorithms", grade: "C+" },
          ],
        },
        {
          name: "First Semester, Year 3",
          cgp: 2.8,
          courses: [
            { code: "CS301", name: "Software Engineering", grade: "B" },
            { code: "CS302", name: "Artificial Intelligence", grade: "C+" },
            { code: "CS303", name: "Computer Graphics", grade: "B-" },
          ],
        },
      ],
      cgp: 2.8,
      attendance: 88,
      performanceData: [
        { course: "CS301", score: 82 },
        { course: "CS302", score: 75 },
        { course: "CS303", score: 78 },
      ],
    },
    STU008: {
      name: "Hannah Montana",
      currentSemester: "Second Semester, Year 3",
      semesters: [
        {
          name: "First Semester, Year 1",
          cgp: 3.0,
          courses: [
            { code: "CS101", name: "Introduction to Programming", grade: "A" },
            { code: "CS102", name: "Computer Architecture", grade: "B+" },
            { code: "MATH101", name: "Calculus I", grade: "A-" },
          ],
        },
        {
          name: "Second Semester, Year 1",
          cgp: 3.2,
          courses: [
            { code: "CS103", name: "Data Structures", grade: "A" },
            { code: "CS104", name: "Discrete Mathematics", grade: "B+" },
            { code: "MATH102", name: "Linear Algebra", grade: "A" },
          ],
        },
        {
          name: "First Semester, Year 2",
          cgp: 3.4,
          courses: [
            { code: "CS201", name: "Object-Oriented Programming", grade: "A" },
            { code: "CS202", name: "Database Systems", grade: "A" },
            { code: "CS203", name: "Computer Networks", grade: "A-" },
          ],
        },
        {
          name: "Second Semester, Year 2",
          cgp: 3.6,
          courses: [
            { code: "CS204", name: "Operating Systems", grade: "A+" },
            { code: "CS205", name: "Web Development", grade: "A" },
            { code: "CS206", name: "Algorithms", grade: "A-" },
          ],
        },
        {
          name: "First Semester, Year 3",
          cgp: 3.5,
          courses: [
            { code: "CS301", name: "Software Engineering", grade: "A" },
            { code: "CS302", name: "Artificial Intelligence", grade: "A" },
            { code: "CS303", name: "Computer Graphics", grade: "A" },
          ],
        },
        {
          name: "Second Semester, Year 3",
          cgp: 3.5,
          courses: [
            { code: "CS304", name: "Machine Learning", grade: "A" },
            { code: "CS305", name: "Cybersecurity", grade: "A" },
            { code: "CS306", name: "Cloud Computing", grade: "A" },
          ],
        },
      ],
      cgp: 3.5,
      attendance: 92,
      performanceData: [
        { course: "CS301", score: 88 },
        { course: "CS302", score: 90 },
        { course: "CS303", score: 91 },
        { course: "CS304", score: 89 },
        { course: "CS305", score: 95 },
      ],
    },
    STU009: {
      name: "Ian McKellen",
      currentSemester: "First Semester, Year 3",
      semesters: [
        {
          name: "First Semester, Year 1",
          cgp: 3.2,
          courses: [
            { code: "CS101", name: "Introduction to Programming", grade: "B" },
            { code: "CS102", name: "Computer Architecture", grade: "B+" },
            { code: "MATH101", name: "Calculus I", grade: "A" },
          ],
        },
        {
          name: "Second Semester, Year 1",
          cgp: 3.4,
          courses: [
            { code: "CS103", name: "Data Structures", grade: "A" },
            { code: "CS104", name: "Discrete Mathematics", grade: "A-" },
            { code: "MATH102", name: "Linear Algebra", grade: "B" },
          ],
        },
        {
          name: "First Semester, Year 2",
          cgp: 3.0,
          courses: [
            { code: "CS201", name: "Object-Oriented Programming", grade: "B" },
            { code: "CS202", name: "Database Systems", grade: "B+" },
            { code: "CS203", name: "Computer Networks", grade: "B" },
          ],
        },
        {
          name: "Second Semester, Year 2",
          cgp: 3.2,
          courses: [
            { code: "CS204", name: "Operating Systems", grade: "B+" },
            { code: "CS205", name: "Web Development", grade: "A-" },
            { code: "CS206", name: "Algorithms", grade: "C+" },
          ],
        },
        {
          name: "First Semester, Year 3",
          cgp: 3.2,
          courses: [
            { code: "CS301", name: "Software Engineering", grade: "B+" },
            { code: "CS302", name: "Artificial Intelligence", grade: "A" },
            { code: "CS303", name: "Computer Graphics", grade: "B" },
          ],
        },
      ],
      cgp: 3.2,
      attendance: 90,
      performanceData: [
        { course: "CS301", score: 84 },
        { course: "CS302", score: 88 },
        { course: "CS303", score: 86 },
      ],
    },
    STU010: {
      name: "Julia Roberts",
      currentSemester: "First Semester, Year 3",
      semesters: [
        {
          name: "First Semester, Year 1",
          cgp: 2.7,
          courses: [
            { code: "CS101", name: "Introduction to Programming", grade: "C+" },
            { code: "CS102", name: "Computer Architecture", grade: "C" },
            { code: "MATH101", name: "Calculus I", grade: "C" },
          ],
        },
        {
          name: "Second Semester, Year 1",
          cgp: 2.5,
          courses: [
            { code: "CS103", name: "Data Structures", grade: "C+" },
            { code: "CS104", name: "Discrete Mathematics", grade: "C" },
            { code: "MATH102", name: "Linear Algebra", grade: "B" },
          ],
        },
        {
          name: "First Semester, Year 2",
          cgp: 2.6,
          courses: [
            { code: "CS201", name: "Object-Oriented Programming", grade: "C" },
            { code: "CS202", name: "Database Systems", grade: "C" },
            { code: "CS203", name: "Computer Networks", grade: "D" },
          ],
        },
        {
          name: "Second Semester, Year 2",
          cgp: 2.4,
          courses: [
            { code: "CS204", name: "Operating Systems", grade: "C" },
            { code: "CS205", name: "Web Development", grade: "C" },
            { code: "CS206", name: "Algorithms", grade: "C" },
          ],
        },
        {
          name: "First Semester, Year 3",
          cgp: 2.5,
          courses: [
            { code: "CS301", name: "Software Engineering", grade: "C" },
            { code: "CS302", name: "Artificial Intelligence", grade: "C+" },
            { code: "CS303", name: "Computer Graphics", grade: "D" },
          ],
        },
      ],
      cgp: 2.5,
      attendance: 85,
      performanceData: [
        { course: "CS301", score: 75 },
        { course: "CS302", score: 78 },
        { course: "CS303", score: 70 },
      ],
    },
    STU011: {
      name: "Kevin Hart",
      currentSemester: "First Semester, Year 3",
      semesters: [
        {
          name: "First Semester, Year 1",
          cgp: 2.0,
          courses: [
            { code: "CS101", name: "Introduction to Programming", grade: "D" },
            { code: "CS102", name: "Computer Architecture", grade: "D" },
            { code: "MATH101", name: "Calculus I", grade: "D" },
          ],
        },
        {
          name: "Second Semester, Year 1",
          cgp: 1.9,
          courses: [
            { code: "CS103", name: "Data Structures", grade: "D" },
            { code: "CS104", name: "Discrete Mathematics", grade: "D" },
            { code: "MATH102", name: "Linear Algebra", grade: "D" },
          ],
        },
        {
          name: "First Semester, Year 2",
          cgp: 1.7,
          courses: [
            { code: "CS201", name: "Object-Oriented Programming", grade: "D" },
            { code: "CS202", name: "Database Systems", grade: "D" },
            { code: "CS203", name: "Computer Networks", grade: "F" },
          ],
        },
        {
          name: "Second Semester, Year 2",
          cgp: 1.8,
          courses: [
            { code: "CS204", name: "Operating Systems", grade: "D" },
            { code: "CS205", name: "Web Development", grade: "D" },
            { code: "CS206", name: "Algorithms", grade: "D" },
          ],
        },
        {
          name: "First Semester, Year 3",
          cgp: 1.8,
          courses: [
            { code: "CS301", name: "Software Engineering", grade: "D" },
            { code: "CS302", name: "Artificial Intelligence", grade: "D" },
            { code: "CS303", name: "Computer Graphics", grade: "D" },
          ],
        },
      ],
      cgp: 1.8,
      attendance: 80,
      performanceData: [
        { course: "CS301", score: 60 },
        { course: "CS302", score: 62 },
        { course: "CS303", score: 58 },
      ],
    },
    STU012: {
      name: "Liam Neeson",
      currentSemester: "First Semester, Year 3",
      semesters: [
        {
          name: "First Semester, Year 1",
          cgp: 3.5,
          courses: [
            { code: "CS101", name: "Introduction to Programming", grade: "A" },
            { code: "CS102", name: "Computer Architecture", grade: "B+" },
            { code: "MATH101", name: "Calculus I", grade: "A" },
          ],
        },
        {
          name: "Second Semester, Year 1",
          cgp: 3.6,
          courses: [
            { code: "CS103", name: "Data Structures", grade: "A" },
            { code: "CS104", name: "Discrete Mathematics", grade: "A" },
            { code: "MATH102", name: "Linear Algebra", grade: "A" },
          ],
        },
        {
          name: "First Semester, Year 2",
          cgp: 3.8,
          courses: [
            { code: "CS201", name: "Object-Oriented Programming", grade: "A+" },
            { code: "CS202", name: "Database Systems", grade: "A" },
            { code: "CS203", name: "Computer Networks", grade: "A" },
          ],
        },
        {
          name: "Second Semester, Year 2",
          cgp: 3.9,
          courses: [
            { code: "CS204", name: "Operating Systems", grade: "A+" },
            { code: "CS205", name: "Web Development", grade: "A+" },
            { code: "CS206", name: "Algorithms", grade: "A" },
          ],
        },
        {
          name: "First Semester, Year 3",
          cgp: 3.7,
          courses: [
            { code: "CS301", name: "Software Engineering", grade: "A" },
            { code: "CS302", name: "Artificial Intelligence", grade: "A" },
            { code: "CS303", name: "Computer Graphics", grade: "A" },
          ],
        },
      ],
      cgp: 3.7,
      attendance: 95,
      performanceData: [
        { course: "CS301", score: 92 },
        { course: "CS302", score: 90 },
        { course: "CS303", score: 93 },
      ],
    },

  };
  

  
  // Add similar detailed data for STU003 to STU015


  const generateStudentData = (numStudents: number) => {
    const courses = ['CS301', 'CS205', 'CS401']
    return Array.from({ length: numStudents }, (_, i) => ({
      id: `STU${(i + 1).toString().padStart(3, '0')}`,
      CS301: Math.floor(Math.random() * 41) + 60,
      CS205: Math.floor(Math.random() * 41) + 60,
      CS401: Math.floor(Math.random() * 41) + 60,
    }))
  }

  const studentData = generateStudentData(100)

  const prepareChartData = () => {
    return studentData.map((student, index) => ({
      name: student.id,
      [selectedCourses[0]]: student[selectedCourses[0] as keyof typeof student],
      [selectedCourses[1]]: student[selectedCourses[1] as keyof typeof student],
    }))
  }

  const [chartData, setChartData] = useState(prepareChartData())

  useEffect(() => {
    setChartData(prepareChartData())
  }, [selectedCourses])

  const courseNames = {
    CS301: "Database Systems",
    CS205: "Web Development",
    CS401: "Algorithms"
  }

  // const getRemark = (attendance: number, total: number, grade: string) => {
  //   if (attendance < 75) return "Boost attendance level"
  //   if (total < 60) return "Consider reducing credit units next semester"
  //   if (grade === "A" || grade === "B") return "Keep it up"
  //   return "Average performance, can improve"
  // }


  const getPerformanceColor = (cgp: number) => {
    if (cgp >= 3.5) return "bg-green-100 text-green-800"
    if (cgp >= 2.5) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }


  const getRemark = (attendance: number, cgp: number) => {
    if (attendance < 75) return "Boost attendance level"
    if (cgp < 2.0) return "Consider reducing credit units next semester"
    if (cgp >= 3.5) return "Excellent performance"
    return "Average performance, room for improvement"
  }

  const openStudentModal = (studentId: string) => {
    const student = studentDetails[studentId as keyof typeof studentDetails];
    if (student && student.semesters && student.semesters.length > 0) {
      setSelectedStudent(student);
      setSelectedSemester(student.semesters[0].name);
    } else {
      setSelectedStudent(null);
      setSelectedSemester(null);
    }
  }
  const notifyStudent = (studentId: string, message: string) => {
    toast({
      title: "Notification Sent",
      description: `Message sent to student ${studentId}: ${message}`,
    })
  }

  return (
    <div className="container mx-auto p-4">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {lecturer.name}</h1>
          <p className="text-muted-foreground">Lecturer ID: {lecturer.id} | Department: {lecturer.department}</p>
        </div>
        <Avatar className="h-12 w-12 mt-4 sm:mt-0">
          <AvatarImage src="/placeholder.svg?height=48&width=48" alt={lecturer.name} />
          <AvatarFallback>{lecturer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Classes</CardTitle>
            <CardDescription>Your schedule for today</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <ul className="space-y-4">
                {upcomingClasses.map((class_) => (
                  <li key={class_.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{class_.title}</p>
                      <p className="text-sm text-muted-foreground">{class_.room}</p>
                    </div>
                    <Badge>{class_.time}</Badge>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Courses Taught</CardTitle>
            <CardDescription>Your current semester courses</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <ul className="space-y-4">
                {coursesTaught.map((course) => (
                  <li key={course.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{course.name}</p>
                      <p className="text-sm text-muted-foreground">{course.id}</p>
                    </div>
                    <Badge variant="secondary">{course.students} students</Badge>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Schedule and important dates</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Student Information and Performance</CardTitle>
          <CardDescription>Detailed view of student data and metrics</CardDescription>
        </CardHeader>
        <CardContent>
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>CGP</TableHead>
            <TableHead>Classification</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {studentInfo.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.id}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" onClick={() => openStudentModal(student.id)}>
                      {student.name}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>{selectedStudent?.name}</DialogTitle>
                      <DialogDescription>Student Details and Performance</DialogDescription>
                    </DialogHeader>
                    {selectedStudent && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Current Semester</h3>
                          <p>{selectedStudent.currentSemester}</p>
                          <h3 className="text-lg font-semibold mt-4 mb-2">Overall CGP</h3>
                          <Badge className={getPerformanceColor(selectedStudent.cgp)}>
                            {selectedStudent.cgp.toFixed(2)}
                          </Badge>
                          <h3 className="text-lg font-semibold mt-4 mb-2">Attendance</h3>
                          <Badge className={selectedStudent.attendance < 75 ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}>
                            {selectedStudent.attendance}%
                          </Badge>
                          <h3 className="text-lg font-semibold mt-4 mb-2">Remark</h3>
                          <p className="text-sm text-muted-foreground">
                            {getRemark(selectedStudent.attendance, selectedStudent.cgp)}
                          </p>
                          {(selectedStudent.cgp < 2.5 || selectedStudent.attendance < 75) && (
                            <Button
                              className="mt-2"
                              onClick={() => notifyStudent(selectedStudent.id, "Your performance needs improvement. Please see your advisor.")}
                            >
                              <TrendingUp className="w-4 h-4 mr-2" />
                              Notify for Improvement
                            </Button>
                          )}
                          <h3 className="text-lg font-semibold mt-4 mb-2">Performance Graph</h3>
                          <ChartContainer
                            config={{
                              score: {
                                label: "Score",
                                color: "hsl(var(--chart-1))",
                              },
                            }}
                            className="h-[200px]"
                          >
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={selectedStudent.performanceData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="course" />
                                <YAxis />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="score" fill="var(--color-score)" />
                              </BarChart>
                            </ResponsiveContainer>
                          </ChartContainer>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Semester Courses</h3>
                          <div className="flex flex-wrap gap-2 mb-4">
                          {selectedStudent.semesters.map((semester: Semester, index) => (
                              <Button
                                key={index}
                                variant={selectedSemester === semester.name ? "default" : "outline"}
                                onClick={() => setSelectedSemester(semester.name)}
                              >
                                {semester.name.split(',')[0]}
                              </Button>
                            ))}
                          </div>
                          {selectedSemester && (
                            <div>
                              <h4 className="font-semibold mb-2">{selectedSemester}</h4>
                              <p className="mb-2">CGP: {selectedStudent.semesters.find(s => s.name === selectedSemester)?.cgp.toFixed(2)}</p>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Course Code</TableHead>
                                    <TableHead>Course Name</TableHead>
                                    <TableHead>Grade</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {selectedStudent.semesters.find(s => s.name === selectedSemester)?.courses.map((course, index) => (
                                    <TableRow key={index}>
                                      <TableCell>{course.code}</TableCell>
                                      <TableCell>{course.name}</TableCell>
                                      <TableCell>{course.grade}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              
                              </Table>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell>
                <Badge className={getPerformanceColor(student.cgp)}>
                  {student.cgp.toFixed(2)}
                </Badge>
              </TableCell>
              <TableCell>{student.classification}</TableCell>
              <TableCell>
                <Button
                  size="sm"
                  onClick={() => notifyStudent(student.id, "General notification from your lecturer.")}
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Notify
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
        </CardContent>
      </Card>

      <Card className="mt-6 overflow-hidden">
        <CardHeader>
          <CardTitle>Student Performance Comparison</CardTitle>
          <CardDescription>Compare student grades across two courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Select onValueChange={(value) => setSelectedCourses([value, selectedCourses[1]])} defaultValue={selectedCourses[0]}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select first course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CS301">CS301: Database Systems</SelectItem>
                <SelectItem value="CS205">CS205: Web Development</SelectItem>
                <SelectItem value="CS401">CS401: Algorithms</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setSelectedCourses([selectedCourses[0], value])} defaultValue={selectedCourses[1]}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select second course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CS301">CS301: Database Systems</SelectItem>
                <SelectItem value="CS205">CS205: Web Development</SelectItem>
                <SelectItem value="CS401">CS401: Algorithms</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ChartContainer
            config={{
              [selectedCourses[0]]: {
                label: courseNames[selectedCourses[0] as keyof typeof courseNames],
                color: "hsl(var(--chart-1))",
              },
              [selectedCourses[1]]: {
                label: courseNames[selectedCourses[1] as keyof typeof courseNames],
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey={selectedCourses[0]} stroke="var(--color-x)" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey={selectedCourses[1]} stroke="var(--color-y)" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent Assignments</CardTitle>
          <CardDescription>Status of recently posted assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px]">
            <ul className="space-y-4">
              {recentAssignments.map((assignment) => (
                <li key={assignment.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{assignment.title}</p>
                    <p className="text-sm text-muted-foreground">{assignment.course}</p>
                  </div>
                  <Badge variant="outline">
                    {assignment.submitted}/{assignment.total} submitted
                  </Badge>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" /> Create Assignment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Assignment</DialogTitle>
                  <DialogDescription>Fill in the details for the new assignment.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">Title</Label>
                    <Input id="title" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="course" className="text-right">Course</Label>
                    <Input id="course" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dueDate" className="text-right">Due Date</Label>
                    <Input id="dueDate" type="date" className="col-span-3" />
                  </div>
                </div>
                <Button type="submit">Create Assignment</Button>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <Users className="mr-2 h-4 w-4" /> Manage Students
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Manage Students</DialogTitle>
                  <DialogDescription>View and manage student information.</DialogDescription>
                </DialogHeader>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>CGP</TableHead>
                      <TableHead>Classification</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentInfo.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.id}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.cgp.toFixed(2)}</TableCell>
                        <TableCell>{student.classification}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <FileText className="mr-2 h-4 w-4" /> Grade Submissions
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Grade Submissions</DialogTitle>
                  <DialogDescription>Review and grade student submissions.</DialogDescription>
                </DialogHeader>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Assignment</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentInfo.map((student, index) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.id}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{courseDetails[index % courseDetails.length].courseCode}</TableCell>
                        <TableCell>Assignment {index + 1}</TableCell>
                        <TableCell>{new Date().toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button size="sm">Grade</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <Clock className="mr-2 h-4 w-4" /> Set Office Hours
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Set Office Hours</DialogTitle>
                  <DialogDescription>Schedule your office hours for students.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="day" className="text-right">Day</Label>
                    <Input id="day" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4  items-center gap-4">
                    <Label htmlFor="startTime" className="text-right">Start Time</Label>
                    <Input id="startTime" type="time" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="endTime" className="text-right">End Time</Label>
                    <Input id="endTime" type="time" className="col-span-3" />
                  </div>
                </div>
                <Button type="submit">Set Office Hours</Button>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

