"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Paperclip, Image, File, X } from "lucide-react"

export default function ChatPage() {
  const [activeChat, setActiveChat] = useState("chat-1")
  const [message, setMessage] = useState("")
  const [attachments, setAttachments] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  type Message = {
    id: string
    sender: string
    content: string
    time: string
    isUser: boolean
  }

  type Chat = {
    id: string
    name: string
    avatar: string
    status: "online" | "offline"
    lastMessage: string
    lastMessageTime: string
    unread: number
    messages: Message[]
  }

  // Placeholder chat data
  const chats: Chat[] = [
    {
      id: "chat-1",
      name: "Alice",
      avatar: "/avatars/alice.jpg",
      status: "online",
      lastMessage: "See you soon!",
      lastMessageTime: "10:45 AM",
      unread: 2,
      messages: [
        { id: "m1", sender: "Alice", content: "Hi there!", time: "10:43 AM", isUser: false },
        { id: "m2", sender: "Me", content: "Hey!", time: "10:44 AM", isUser: true }
      ]
    }
  ]

  const activeMessages = chats.find((chat) => chat.id === activeChat)?.messages || []

  const handleSendMessage = () => {
    if (message.trim() || attachments.length > 0) {
      console.log("Sending message:", message, attachments)
      setMessage("")
      setAttachments([])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)])
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [activeMessages])

  const activeChatData = chats.find((c) => c.id === activeChat)

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)]">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
        <Button className="bg-green-600 hover:bg-green-700">New Message</Button>
      </div>

      <div className="flex flex-1 gap-4 h-full overflow-hidden">
        {/* Sidebar */}
        <Card className="w-1/3">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
            <CardDescription>Chat with logistics providers and customers</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="mb-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="providers">Providers</TabsTrigger>
                <TabsTrigger value="customers">Customers</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="space-y-2 h-[calc(100vh-20rem)] overflow-y-auto pr-2">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    activeChat === chat.id ? "bg-green-50" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveChat(chat.id)}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={chat.avatar} alt={chat.name} />
                      <AvatarFallback>{chat.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                        chat.status === "online" ? "bg-green-500" : "bg-gray-300"
                      }`}
                    ></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{chat.name}</p>
                      <p className="text-xs text-muted-foreground">{chat.lastMessageTime}</p>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && <Badge className="bg-green-600">{chat.unread}</Badge>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Chat Window */}
        <Card className="flex-1 flex flex-col">
          {activeChat && activeChatData && (
            <>
              <CardHeader className="border-b flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={activeChatData.avatar} alt={activeChatData.name} />
                  <AvatarFallback>{activeChatData.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{activeChatData.name}</p>
                  <p className="text-sm text-muted-foreground">{activeChatData.status}</p>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto space-y-4 p-4">
                {activeMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
                    {!msg.isUser && (
                      <Avatar className="h-8 w-8 mr-2 mt-1">
                        <AvatarImage src={activeChatData.avatar} alt={msg.sender} />
                        <AvatarFallback>{msg.sender.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        msg.isUser ? "bg-green-600 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs text-right mt-1 opacity-70">{msg.time}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </CardContent>
              <div className="p-4 border-t">
                {attachments.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {attachments.map((file, index) => (
                      <div key={index} className="flex items-center gap-1 bg-gray-100 rounded-full pl-2 pr-1 py-1">
                        {file.type.startsWith("image/") ? <Image className="h-3 w-3" /> : <File className="h-3 w-3" />}
                        <span className="text-xs truncate max-w-[100px]">{file.name}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 rounded-full"
                          onClick={() => removeAttachment(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="rounded-full" onClick={handleFileUpload}>
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} multiple />
                  <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1"
                  />
                  <Button
                    className="rounded-full bg-green-600 hover:bg-green-700"
                    size="icon"
                    onClick={handleSendMessage}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
