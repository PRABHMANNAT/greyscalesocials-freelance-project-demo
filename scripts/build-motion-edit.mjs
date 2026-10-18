import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";

// An original motion composition of the publicly accessible covers.
// This is not original reel footage and must remain labelled as a concept edit.
const root = resolve(import.meta.dirname, "..");
const temporary = join(root, ".qa", "motion-render");
const destination = join(root, "public", "assets", "reels");
mkdirSync(temporary, { recursive: true });
mkdirSync(destination, { recursive: true });
const scenes = [
  ["countryside-01", "galini-01", "lovely-sweets-02"],
  ["kesar-01", "golden-sarovar-01", "lovely-sweets-01"],
  ["countryside-02", "spicy-hut-01", "countryside-03"],
];

function run(args) {
  const result = spawnSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args], { cwd: root, stdio: "inherit" });
  if (result.status !== 0) throw new Error(`FFmpeg failed: ${result.status ?? result.error?.message}`);
}

scenes.forEach((files, scene) => {
  const inputs = files.flatMap(file => ["-loop", "1", "-framerate", "30", "-i", join(root, "public/assets/thumbnails", `${file}.jpg`)]);
  const filters = files.map((_, index) => `[${index}:v]scale=396:704,crop=360:640:x='18+14*sin(t*0.65+${index})':y='32+24*cos(t*0.5+${scene})',setsar=1[p${index}]`);
  filters.push(`color=c=0x24251f:s=1280x720:r=30:d=4[base]`);
  filters.push(`[base][p0]overlay=50:40:shortest=1[b1]`);
  filters.push(`[b1][p1]overlay=460:40:shortest=1[b2]`);
  filters.push(`[b2][p2]overlay=870:40:shortest=1,format=yuv420p[out]`);
  run([...inputs, "-filter_complex", filters.join(";"), "-map", "[out]", "-t", "4", "-an", "-c:v", "libx264", "-preset", "fast", "-crf", "20", join(temporary, `scene-${scene}.mp4`)]);
});

run(["-i", join(temporary, "scene-0.mp4"), "-i", join(temporary, "scene-1.mp4"), "-i", join(temporary, "scene-2.mp4"), "-filter_complex", "[0:v][1:v]xfade=transition=fade:duration=0.5:offset=3.5[a];[a][2:v]xfade=transition=fade:duration=0.5:offset=7,format=yuv420p[out]", "-map", "[out]", "-an", "-c:v", "libx264", "-preset", "fast", "-crf", "20", "-movflags", "+faststart", join(destination, "studio-cover-edit.mp4")]);
run(["-i", join(destination, "studio-cover-edit.mp4"), "-frames:v", "1", "-q:v", "2", join(root, "public/assets/hero/studio-cover-edit-poster.jpg")]);
writeFileSync(join(destination, "studio-cover-edit-provenance.json"), JSON.stringify({
  type: "Original concept motion edit composed from authentic public reel cover images",
  sourceManifest: "/assets/asset-manifest.json",
  inputs: scenes.flat().map(file => `/assets/thumbnails/${file}.jpg`),
  durationSeconds: 11,
  dimensions: [1280, 720],
  audio: false,
  restriction: "Private demonstration. This is animated cover imagery, not the studio's original reel footage.",
}, null, 2));
// Remove only known temporary files created by this script. No recursive deletion.
scenes.forEach((_, index) => rmSync(join(temporary, `scene-${index}.mp4`), { force: true }));
console.log("Created studio-cover-edit.mp4 and its poster.");
