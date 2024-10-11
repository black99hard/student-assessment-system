'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Calendar as  FileText,  AlertTriangle,  } from 'lucide-react';
import {  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';


export default function EnhancedStudentDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  // Mock data (you would typically fetch this from an API)
  const student = {
    name: "SALAHUDEEN RIDWAN",
    id: "BASUG/UG/SCI/CSC/20/10474",
    course: "Computer Science",
    year: 4,
    semester: 2,
    cgpa: 3.7,
    totalCredits: 140,
    creditsRequired: 160,
    advisor: "Dr. Emily Parker",
    session: "2020/2021 - 2023/2024"
  };

  const allCourses = [
    { id: "CS101", name: "Introduction to Programming", semester: "Year 1, Semester 1", grade: "A", credits: 4 },
    { id: "CS102", name: "Computer Architecture", semester: "Year 1, Semester 1", grade: "B+", credits: 3 },
    { id: "MATH101", name: "Calculus I", semester: "Year 1, Semester 1", grade: "A-", credits: 4 },
    { id: "CS103", name: "Data Structures", semester: "Year 1, Semester 2", grade: "A", credits: 4 },
    { id: "CS104", name: "Discrete Mathematics", semester: "Year 1, Semester 2", grade: "B", credits: 3 },
    { id: "MATH102", name: "Linear Algebra", semester: "Year 1, Semester 2", grade: "B+", credits: 4 },
    { id: "CS201", name: "Object-Oriented Programming", semester: "Year 2, Semester 1", grade: "A-", credits: 4 },
    { id: "CS202", name: "Database Systems", semester: "Year 2, Semester 1", grade: "B+", credits: 4 },
    { id: "CS203", name: "Computer Networks", semester: "Year 2, Semester 1", grade: "A", credits: 3 },
    { id: "CS204", name: "Algorithms", semester: "Year 2, Semester 2", grade: "B", credits: 4 },
    { id: "CS205", name: "Operating Systems", semester: "Year 2, Semester 2", grade: "A-", credits: 4 },
    { id: "CS206", name: "Software Engineering", semester: "Year 2, Semester 2", grade: "B+", credits: 3 },
    { id: "CS301", name: "Artificial Intelligence", semester: "Year 3, Semester 1", grade: "A", credits: 4 },
    { id: "CS302", name: "Web Development", semester: "Year 3, Semester 1", grade: "A-", credits: 3 },
    { id: "CS303", name: "Computer Graphics", semester: "Year 3, Semester 1", grade: "B", credits: 3 },
    { id: "CS304", name: "Machine Learning", semester: "Year 3, Semester 2", grade: "B+", credits: 4 },
    { id: "CS305", name: "Cybersecurity", semester: "Year 3, Semester 2", grade: "A", credits: 3 },
    { id: "CS306", name: "Cloud Computing", semester: "Year 3, Semester 2", grade: "B", credits: 3 },
    { id: "CS401", name: "Final Year Project I", semester: "Year 4, Semester 1", grade: "A-", credits: 4 },
    { id: "CS402", name: "Data Science", semester: "Year 4, Semester 1", grade: "B+", credits: 3 },
    { id: "CS403", name: "Internet of Things", semester: "Year 4, Semester 1", grade: "A", credits: 3 },
    { id: "CS404", name: "Final Year Project II", semester: "Year 4, Semester 2", grade: "In Progress", credits: 4 },
    { id: "CS405", name: "Blockchain Technology", semester: "Year 4, Semester 2", grade: "In Progress", credits: 3 },
    { id: "CS406", name: "Natural Language Processing", semester: "Year 4, Semester 2", grade: "In Progress", credits: 3 },
  ];

  const currentSemesterCourses = allCourses.filter(course => course.semester === `Year ${student.year}, Semester ${student.semester}`);

  const upcomingAssessments = [
    { id: 1, title: "Final Year Project II Presentation", date: "2024-05-20", course: "CS404" },
    { id: 2, title: "Blockchain Technology Final Exam", date: "2024-05-25", course: "CS405" },
    { id: 3, title: "NLP Project Submission", date: "2024-06-01", course: "CS406" },
    { id: 4, title: "Comprehensive Viva", date: "2024-06-10", course: "ALL" },
  ];

  const recentGrades = [
    { id: 1, title: "Data Science Final", grade: "B+", course: "CS402", score: 88 },
    { id: 2, title: "IoT Project", grade: "A", course: "CS403", score: 95 },
    { id: 3, title: "FYP I Presentation", grade: "A-", course: "CS401", score: 90 },
  ];

  const courseMaterials = [
    {
      id: 1,
      title: "FYP II Guidelines",
      course: "CS404",
      courseTitle: "Final Year Project II",
      type: "Document",
      link: "#",
      description: "Comprehensive guide for Final Year Project II, including milestones and evaluation criteria.",
      assignments: [
        { id: 1, title: "Project Proposal", dueDate: "2024-05-20", status: "Submitted" },
        { id: 2, title: "Progress Report", dueDate: "2024-06-15", status: "Pending" },
        { id: 3, title: "Final Presentation", dueDate: "2024-07-10", status: "Not Started" },
      ],
      resources: [
        { id: 1, title: "Project Templates", type: "ZIP" },
        { id: 2, title: "Research Paper Guidelines", type: "PDF" },
      ]
    },
    {
      id: 2,
      title: "Blockchain Fundamentals",
      course: "CS405",
      courseTitle: "Blockchain Technology",
      type: "Lecture Slides",
      link: "#",
      description: "Introduction to blockchain technology, covering basic concepts and applications.",
      assignments: [
        { id: 1, title: "Blockchain Use Case Analysis", dueDate: "2024-05-25", status: "In Progress" },
        { id: 2, title: "Smart Contract Implementation", dueDate: "2024-06-10", status: "Not Started" },
      ],
      resources: [
        { id: 1, title: "Blockchain Whitepaper", type: "PDF" },
        { id: 2, title: "Solidity Tutorial", type: "Video" },
      ]
    },
    {
      id: 3,
      title: "NLP Algorithms",
      course: "CS406",
      courseTitle: "Natural Language Processing",
      type: "Tutorial",
      link: "#",
      description: "Overview of key NLP algorithms and their applications in modern AI systems.",
      assignments: [
        { id: 1, title: "Sentiment Analysis Project", dueDate: "2024-06-01", status: "Not Started" },
        { id: 2, title: "Language Model Fine-tuning", dueDate: "2024-06-20", status: "Not Started" },
      ],
      resources: [
        { id: 1, title: "NLP Dataset", type: "CSV" },
        { id: 2, title: "Python NLP Libraries", type: "Notebook" },
      ]
    },
  ];

  const scheduleEvents = [
    { id: 1, title: "FYP II Consultation", date: "2024-05-12", time: "10:00 AM - 11:30 AM", location: "Prof. Johnson's Office" },
    { id: 2, title: "Blockchain Tech Lecture", date: "2024-05-13", time: "2:00 PM - 4:00 PM", location: "Room CS-301" },
    { id: 3, title: "NLP Lab", date: "2024-05-14", time: "11:00 AM - 1:00 PM", location: "AI Lab" },
  ];

  const academicHistory = [
    { semester: "Year 1", gpa: 3.5, credits: 36 },
    { semester: "Year 2", gpa: 3.6, credits: 38 },
    { semester: "Year 3", gpa: 3.8, credits: 40 },
    { semester: "Year 4 (In Progress)", gpa: 3.7, credits: 26 },
  ];

  const cgpaData = [
    { semester: "Year 1", cgpa: 3.5 },
    { semester: "Year 2", cgpa: 3.55 },
    { semester: "Year 3", cgpa: 3.65 },
    { semester: "Year 4 (Current)", cgpa: 3.7 },
  ];

  const getRemarks = (cgpa: number, attendance: number, creditsCompleted: number) => {
    let remarks = [];
    if (cgpa >= 3.5) {
      remarks.push("Excellent academic performance! Keep up the great work.");
    } else if (cgpa >= 3.0) {
      remarks.push("Good academic standing. Consider aiming higher for better opportunities.");
    } else {
      remarks.push("There's room for improvement in your academic performance. Consider seeking additional support.");
    }

    if (attendance < 75) {
      remarks.push("Your attendance is below the recommended level. Try to attend more classes to improve your understanding.");
    }

    if (creditsCompleted < student.creditsRequired - 20) {
      remarks.push("You're approaching graduation. Ensure you've met all credit requirements for your degree.");
    }

    return remarks;
  };

  const remarks = getRemarks(student.cgpa, 85, student.totalCredits);

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {student.name}</h1>
          <p className="text-muted-foreground">Student ID: {student.id} | Course: {student.course}</p>
          <p className="text-muted-foreground">Year {student.year}, Semester {student.semester} | Session: {student.session}</p>
          <p className="text-muted-foreground">CGPA: {student.cgpa} | Total Credits: {student.totalCredits}/{student.creditsRequired}</p>
        </div>
        <Avatar className="h-12 w-12">
          <AvatarImage src="/placeholder.svg?height=48&width=48" alt={student.name} />
          <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
      </header>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Academic Progress</CardTitle>
          <CardDescription>Your journey towards graduation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Credits Completed</span>
              <span>{student.totalCredits}/{student.creditsRequired}</span>
            </div>
            <Progress value={(student.totalCredits / student.creditsRequired) * 100} className="w-full" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Current Semester Courses</CardTitle>
            <CardDescription>Year {student.year}, Semester {student.semester}</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <ul className="space-y-2">
                {currentSemesterCourses.map((course) => (
                  <li key={course.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{course.name}</p>
                      <p className="text-sm text-muted-foreground">{course.id}</p>
                    </div>
                    <Badge>{course.grade}</Badge>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Assessments</CardTitle>
            <CardDescription>Your next deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <ul className="space-y-2">
                {upcomingAssessments.map((assessment) => (
                  <li key={assessment.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{assessment.title}</p>
                      <p className="text-sm text-muted-foreground">{assessment.course}</p>
                    </div>
                    <Badge variant="secondary">{assessment.date}</Badge>
                  </li>
                
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Grades</CardTitle>
            <CardDescription>Your latest results</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <ul className="space-y-2">
                {recentGrades.map((grade) => (
                  <li key={grade.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{grade.title}</p>
                      <p className="text-sm text-muted-foreground">{grade.course}</p>
                    </div>
                    <Badge>{grade.grade} ({grade.score}%)</Badge>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Academic Performance</CardTitle>
          <CardDescription>Your CGPA progression over the years</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cgpaData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="semester" />
              <YAxis domain={[0, 4]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="cgpa" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Academic Remarks</CardTitle>
          <CardDescription>Personalized feedback on your performance</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {remarks.map((remark, index) => (
              <li key={index} className="flex items-start space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <span>{remark}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Course History</CardTitle>
          <CardDescription>All courses taken throughout your academic journey</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="year1">
            <TabsList>
              <TabsTrigger value="year1">Year 1</TabsTrigger>
              <TabsTrigger value="year2">Year 2</TabsTrigger>
              <TabsTrigger value="year3">Year 3</TabsTrigger>
              <TabsTrigger value="year4">Year 4</TabsTrigger>
            </TabsList>
            {["year1", "year2", "year3", "year4"].map((year, index) => (
              <TabsContent key={year} value={year}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course Code</TableHead>
                      <TableHead>Course Name</TableHead>
                      <TableHead>Semester</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Credits</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allCourses
                      .filter(course => course.semester.startsWith(`Year ${index + 1}`))
                      .map((course) => (
                        <TableRow key={course.id}>
                          <TableCell>{course.id}</TableCell>
                          <TableCell>{course.name}</TableCell>
                          <TableCell>{course.semester}</TableCell>
                          <TableCell>{course.grade}</TableCell>
                          <TableCell>{course.credits}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-6 mt-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Course Materials</CardTitle>
            <CardDescription>Access your current semester materials</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <ul className="space-y-4">
                {courseMaterials.map((material) => (
                  <li key={material.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{material.title}</p>
                      <p className="text-sm text-muted-foreground">{material.course} - {material.type}</p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => setSelectedMaterial(material)}
                        >
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>{material.courseTitle}</DialogTitle>
                          <DialogDescription>{material.description}</DialogDescription>
                        </DialogHeader>
                        <Tabs defaultValue="assignments">
                          <TabsList>
                            <TabsTrigger value="assignments">Assignments</TabsTrigger>
                            <TabsTrigger value="resources">Resources</TabsTrigger>
                          </TabsList>
                          <TabsContent value="assignments">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Title</TableHead>
                                  <TableHead>Due Date</TableHead>
                                  <TableHead>Status</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {material.assignments.map((assignment) => (
                                  <TableRow key={assignment.id}>
                                    <TableCell>{assignment.title}</TableCell>
                                    <TableCell>{assignment.dueDate}</TableCell>
                                    <TableCell>
                                      <Badge 
                                        variant={
                                          assignment.status === "Submitted" ? "success" :
                                          assignment.status === "In Progress" ? "warning" : "secondary"
                                        }
                                      >
                                        {assignment.status}
                                      </Badge>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TabsContent>
                          <TabsContent value="resources">
                            <ul className="space-y-2">
                              {material.resources.map((resource) => (
                                <li key={resource.id} className="flex items-center space-x-2">
                                  <FileText className="h-4 w-4" />
                                  <span>{resource.title}</span>
                                  <Badge variant="outline">{resource.type}</Badge>
                                </li>
                              ))}
                            </ul>
                          </TabsContent>
                        </Tabs>
                      </DialogContent>
                    </Dialog>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Schedule</CardTitle>
            <CardDescription>Your classes and events for the week</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <ul className="space-y-2">
                {scheduleEvents.map((event) => (
                  <li key={event.id} className="space-y-1">
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.date} | {event.time}</p>
                    <p className="text-sm text-muted-foreground">{event.location}</p>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Graduation Checklist</CardTitle>
          <CardDescription>Track your progress towards graduation requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-center justify-between">
              <span>Required Credits</span>
              <Badge variant={student.totalCredits >= student.creditsRequired ? "success" : "secondary"}>
                {student.totalCredits}/{student.creditsRequired}
              </Badge>
            </li>
            <li className="flex items-center justify-between">
              <span>Minimum CGPA</span>
              <Badge variant={student.cgpa >= 2.0 ? "success" : "secondary"}>
                {student.cgpa >= 2.0 ? "Achieved" : "Not Met"} (Current: {student.cgpa})
              </Badge>
            </li>
            <li className="flex items-center justify-between">
              <span>Final Year Project</span>
              <Badge variant="secondary">In Progress</Badge>
            </li>
            <li className="flex items-center justify-between">
              <span>Internship Requirement</span>
              <Badge variant="success">Completed</Badge>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

