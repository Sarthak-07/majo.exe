module.exports = {
 apps: [
  {
   name: "Majo.exe - Bot",
   script: "./index.js",
   watch: true,
   exec_mode: "cluster",
   ignore_watch: ["[/\\]./", "node_modules", "^.", "^[.]", ".git"],
   watch_options: {
    followSymlinks: false,
   },
   args: ["--color"],
  },
 ],
};