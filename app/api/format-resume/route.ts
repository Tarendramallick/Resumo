import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const resumeData = await request.json()

    const prompt = `You are a professional resume writer and ATS optimization expert. 
    
Please improve and format the following resume data to be more professional, impactful, and ATS-optimized. 
Enhance the descriptions with strong action verbs and quantifiable achievements where possible.
Keep the same structure but improve the content quality.

Resume Data:
- Full Name: ${resumeData.fullName}
- Email: ${resumeData.email}
- Phone: ${resumeData.phone}
- Location: ${resumeData.location}
- Summary: ${resumeData.summary}

Experience:
${resumeData.experience
  .map(
    (exp: any) => `
- Company: ${exp.company}
  Position: ${exp.position}
  Duration: ${exp.startDate} to ${exp.endDate}
  Description: ${exp.description}
`,
  )
  .join("")}

Education:
${resumeData.education
  .map(
    (edu: any) => `
- School: ${edu.school}
  Degree: ${edu.degree}
  Field: ${edu.field}
  Graduation: ${edu.graduationDate}
`,
  )
  .join("")}

Skills: ${resumeData.skills.join(", ")}

Please provide the improved content in JSON format with the same structure, focusing on:
1. Professional language and tone
2. Strong action verbs for experience descriptions
3. Quantifiable achievements and metrics
4. ATS-friendly formatting
5. Concise and impactful summaries

Return ONLY valid JSON with no additional text.`

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt,
    })

    // Parse the AI response
    const improvedData = JSON.parse(text)

    return Response.json(improvedData)
  } catch (error) {
    console.error("Error formatting resume:", error)
    return Response.json({ error: "Failed to format resume" }, { status: 500 })
  }
}
