import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/** Warn (don't fail) when the resume PDF the Resume buttons link to hasn't been added yet. */
function resumeCheck(): Plugin {
  const resume = fileURLToPath(new URL("./public/resume/Diwakar_Kaushik_CV.pdf", import.meta.url));
  return {
    name: "resume-check",
    buildStart() {
      if (!existsSync(resume)) {
        this.warn("public/resume/Diwakar_Kaushik_CV.pdf is missing, so the Resume links will 404 until it is added.");
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), resumeCheck()],
});
