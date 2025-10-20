import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        { error: "OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables." },
        { status: 400 },
      )
    }

    const resumeData = await request.json()

    if (!resumeData.fullName && !resumeData.experience?.length && !resumeData.education?.length) {
      return Response.json(
        { error: "Please fill in at least your name or some experience/education before formatting." },
        { status: 400 },
      )
    }

    const prompt = `You are a professional resume writer and ATS optimization expert. 

Please improve and format the following resume data to be more professional, impactful, and ATS-optimized. 
Enhance the descriptions with strong action verbs and quantifiable achievements where possible.
Keep the same structure but improve the content quality.

Resume Data:
- Full Name: ${resumeData.fullName || "Not provided"}
- Email: ${resumeData.email || "Not provided"}
- Phone: ${resumeData.phone || "Not provided"}
- Location: ${resumeData.location || "Not provided"}
- Summary: ${resumeData.summary || "Not provided"}

Experience:
${
  resumeData.experience && resumeData.experience.length > 0
    ? resumeData.experience
        .map(
          (exp: any) => `
- Company: ${exp.company}
  Position: ${exp.position}
  Duration: ${exp.startDate} to ${exp.endDate}
  Description: ${exp.description}
`,
        )
        .join("")
    : "No experience provided"
}

Education:
${
  resumeData.education && resumeData.education.length > 0
    ? resumeData.education
        .map(
          (edu: any) => `
- School: ${edu.school}
  Degree: ${edu.degree}
  Field: ${edu.field}
  Graduation: ${edu.graduationDate}
`,
        )
        .join("")
    : "No education provided"
}

Skills: ${resumeData.skills && resumeData.skills.length > 0 ? resumeData.skills.join(", ") : "No skills provided"}

Please provide the improved content in JSON format with the same structure, focusing on:
1. Professional language and tone
2. Strong action verbs for experience descriptions
3. Quantifiable achievements and metrics
4. ATS-friendly formatting
5. Concise and impactful summaries

Return ONLY valid JSON with no additional text. Use this exact structure:
{
  "fullName": "string",
  "email": "string",
  "phone": "string",
  "location": "string",
  "summary": "string",
  "experience": [{"company": "string", "position": "string", "startDate": "string", "endDate": "string", "description": "string"}],
  "education": [{"school": "string", "degree": "string", "field": "string", "graduationDate": "string"}],
  "skills": ["string"]
}`

    const model = openai("gpt-4o-mini", {
      apiKey: process.env.OPENAI_API_KEY,
    })

    const { text } = await generateText({
      model,
      prompt,
    })

    let improvedData
    try {
      improvedData = JSON.parse(text)
    } catch (parseError) {
      console.error("Failed to parse AI response:", text)
      return Response.json({ error: "Failed to parse AI response. Please try again." }, { status: 500 })
    }

    return Response.json(improvedData)
  } catch (error) {
    console.error("Error formatting resume:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to format resume"
    return Response.json({ error: `Failed to format resume: ${errorMessage}` }, { status: 500 })
  }
}
