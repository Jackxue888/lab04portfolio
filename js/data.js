/* =========================================================
 * data.js —— 站点数据（唯一的扩展入口）
 * 资料来源：profile.md
 * 新增项目：往 PROJECTS 数组追加一个对象即可，
 * 编号与左右交替方向会自动生成，无需改动其它文件。
 * ========================================================= */

const PROFILE = {
  skills: [
    { group: "前端", items: ["HTML", "CSS", "JavaScript"] },
    { group: "摄影后期", items: ["手机摄影", "Lightroom", "Photoshop"] },
    { group: "其他", items: ["Python", "AI 辅助应用开发"] }
  ],
  facts: [
    { label: "专业", value: "软件工程（数字媒体方向）· 广州软件学院在读" },
    { label: "方向", value: "风光摄影 / 前端与 AI 辅助应用开发" },
    { label: "坐标", value: "广州从化" },
    { label: "经历", value: "退役军人" }
  ]
};

/* 项目字段说明：
 * name     项目名称
 * summary  一句话简介（1–2 行）
 * stack    技术栈数组
 * date     完成时间
 * category 类别（自动分配强调色胶囊）
 * image    配图路径（建议 16:9 左右横图）
 */
const PROJECTS = [
  {
    name: "冬季太行山手机风光摄影集",
    summary: "以冬季太行山为主题，用手机完成风光纪实拍摄；侧重光影、层次与氛围感，整理成系列作品，练习完整的前期取景到精细后期流程。",
    stack: ["手机拍摄", "Lightroom 调色", "后期构图处理"],
    date: "2026.03",
    category: "摄影创作",
    image: "images/project-taihang.svg"
  },
  {
    name: "简易个人记账网页",
    summary: "一个极简收支记录页面，可以添加、查看记录，数据保存在浏览器本地，不需要后端服务器。",
    stack: ["HTML", "CSS", "原生 JavaScript", "本地存储"],
    date: "2025.11",
    category: "Web 应用",
    image: "images/project-ledger.svg"
  }
];
