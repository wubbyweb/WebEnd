/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ovjNLmDUfzT
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

export default function Component() {
  const [activeTab, setActiveTab] = useState("upload")
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [textAnalysisInput, setTextAnalysisInput] = useState("")
  const [textAnalysisQuery, setTextAnalysisQuery] = useState("")
  const [textAnalysisResponse, setTextAnalysisResponse] = useState("")
  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    try {
      await fetch("YOUR_API_URL", {
        method: "POST",
        body: file,
      })
      setUploadedFiles([...uploadedFiles, file.name])
    } catch (error) {
      console.error("Error uploading file:", error)
    }
  }
  const handleTextAnalysis = async () => {
    try {
      const response = await fetch("YOUR_API_URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: textAnalysisInput,
          query: textAnalysisQuery,
        }),
      })
      const data = await response.json()
      setTextAnalysisResponse(data.result)
    } catch (error) {
      console.error("Error analyzing text:", error)
    }
  }
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="#" className="text-lg font-bold" prefetch={false}>
              My App
            </Link>
            <div className="flex gap-4">
              <Link
                href="#"
                className={`px-2 py-1 rounded-md transition-colors ${
                  activeTab === "upload" ? "bg-primary-foreground text-primary" : "hover:bg-primary-foreground/20"
                }`}
                onClick={() => setActiveTab("upload")}
                prefetch={false}
              >
                File Upload
              </Link>
              <Link
                href="#"
                className={`px-2 py-1 rounded-md transition-colors ${
                  activeTab === "text-analysis"
                    ? "bg-primary-foreground text-primary"
                    : "hover:bg-primary-foreground/20"
                }`}
                onClick={() => setActiveTab("text-analysis")}
                prefetch={false}
              >
                Text Analysis
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline">Sign In</Button>
            <Button>Sign Up</Button>
          </div>
        </nav>
      </header>
      <main className="flex-1 overflow-auto">
        {activeTab === "upload" && (
          <div className="container mx-auto my-12 px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-6">File Upload</h2>
            <div className="bg-background rounded-lg shadow-md p-6">
              <div className="mb-6">
                <label htmlFor="file-upload" className="block text-sm font-medium text-muted-foreground mb-2">
                  Choose a file to upload
                </label>
                <div className="flex items-center">
                  <input
                    id="file-upload"
                    type="file"
                    className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    onChange={handleFileUpload}
                  />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Uploaded Files</h3>
                <ul className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <li key={index} className="bg-muted rounded-md px-4 py-2 flex items-center justify-between">
                      <span>{file}</span>
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                        <TrashIcon className="h-5 w-5" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        {activeTab === "text-analysis" && (
          <div className="container mx-auto my-12 px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-6">Text Analysis</h2>
            <div className="bg-background rounded-lg shadow-md p-6">
              <div className="mb-6">
                <label htmlFor="text-input" className="block text-sm font-medium text-muted-foreground mb-2">
                  Enter text to analyze
                </label>
                <Textarea
                  id="text-input"
                  rows={10}
                  className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  value={textAnalysisInput}
                  onChange={(e) => setTextAnalysisInput(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="query-input" className="block text-sm font-medium text-muted-foreground mb-2">
                  Enter a query
                </label>
                <Input
                  id="query-input"
                  type="text"
                  className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  value={textAnalysisQuery}
                  onChange={(e) => setTextAnalysisQuery(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={handleTextAnalysis}>Analyze</Button>
              </div>
              {textAnalysisResponse && (
                <div className="mt-6 bg-muted rounded-md p-4">
                  <p>{textAnalysisResponse}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}


function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}