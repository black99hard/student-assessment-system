'use client'

import { useState } from 'react'
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
import { BookOpen, Calendar as CalendarIcon, FileText, Users, PlusCircle, Clock } from 'lucide-react'
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import withAuth from '@/lib/withAuth'

export default function LecturerDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())

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
  ]

  const coursesTaught = [
    { id: "CS301", name: "Database Systems", students: 45 },
    { id: "CS205", name: "Web Development", students: 60 },
    { id: "CS401", name: "Algorithms", students: 35 },
  ]

  const recentAssignments = [
    { id: 1, title: "Database Design Project", course: "CS301", submitted: 40, total: 45 },
    { id: 2, title: "JavaScript Basics Quiz", course: "CS205", submitted: 58, total: 60 },
    { id: 3, title: "Algorithm Complexity Analysis", course: "CS401", submitted: 30, total: 35 },
  ]

  const performanceData = [
    { month: 'Jan', CS301: 78, CS205: 82, CS401: 75 },
    { month: 'Feb', CS301: 80, CS205: 84, CS401: 78 },
    { month: 'Mar', CS301: 82, CS205: 86, CS401: 80 },
    { month: 'Apr', CS301: 85, CS205: 88, CS401: 83 },
  ]

  const studentList = [
    { id: "STU001", name: "Alice Johnson", course: "CS301", grade: "A-" },
    { id: "STU002", name: "Bob Smith", course: "CS205", grade: "B+" },
    { id: "STU003", name: "Charlie Brown", course: "CS401", grade: "A" },
    { id: "STU004", name: "Diana Ross", course: "CS301", grade: "B" },
    { id: "STU005", name: "Ethan Hunt", course: "CS205", grade: "A-" },
  ]

  const submissionsToGrade = [
    { id: 1, title: "Database Normalization", student: "Alice Johnson", course: "CS301", submitted: "2023-05-10" },
    { id: 2, title: "React Components", student: "Bob Smith", course: "CS205", submitted: "2023-05-11" },
    { id: 3, title: "Sorting Algorithms", student: "Charlie Brown", course: "CS401", submitted: "2023-05-12" },
  ]

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

      <Card className="mt-6 overflow-hidden">
        <CardHeader>
          <CardTitle>Student Performance Overview</CardTitle>
          <CardDescription>Average scores by course over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              CS301: {
                label: "Database Systems",
                color: "hsl(var(--chart-1))",
              },
              CS205: {
                label: "Web Development",
                color: "hsl(var(--chart-2))",
              },
              CS401: {
                label: "Algorithms",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[300px] sm:h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%"> 
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="CS301" stroke="var(--color-CS301)" name="Database Systems" />
                <Line type="monotone" dataKey="CS205" stroke="var(--color-CS205)" name="Web Development" />
                <Line type="monotone" dataKey="CS401" stroke="var(--color-CS401)" name="Algorithms" />
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
                      <TableHead>Course</TableHead>
                      <TableHead>Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentList.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.id}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.course}</TableCell>
                        <TableCell>{student.grade}</TableCell>
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
                      <TableHead>Title</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissionsToGrade.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell>{submission.title}</TableCell>
                        <TableCell>{submission.student}</TableCell>
                        <TableCell>{submission.course}</TableCell>
                        <TableCell>{submission.submitted}</TableCell>
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

