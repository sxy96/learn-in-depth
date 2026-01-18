# 深度学习 App

一个帮助用户从信息过载中解脱，通过 AI 引导进行深度学习的 Web 应用。

## 核心问题

用户每天在社交媒体刷到大量知识内容，但过度刷取导致缺乏深度。本应用帮助用户每天只专注一个主题，彻底吃透，包括每个概念和不同视角，并通过与 AI 反复交互形成自己的深度认知。

## 核心功能

### 1. 每日推荐
- AI 每天推荐 3 个值得深入学习的话题
- 用户选择 1 个开始学习
- 其余 2 个自动加入待学习列表

### 2. 深度学习界面
基于学习科学的 4 阶段引导式学习:

1. **建立认知框架 (Scaffolding)**: 了解核心概念和关键术语
2. **深化理解 (Elaboration)**: 探索概念间关系和多角度视角
3. **批判性思考 (Critical Thinking)**: 挑战假设，发现边界条件
4. **整合内化 (Integration)**: 总结洞察，连接知识体系

特点:
- AI 作为面试官主动提问引导
- 4 阶段进度可视化
- 自动提取关键洞察
- 实时笔记面板

### 3. Backlog 管理
- 查看和管理待学习主题列表
- 随时开始学习任何话题

### 4. 学习历史
- 回顾已完成的学习会话
- 查看所有保存的洞察和笔记

## 技术栈

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Framework**: Tailwind CSS
- **Routing**: React Router
- **State Management**: React Context API
- **Storage**: LocalStorage (MVP)
- **AI**: 模拟响应 (可扩展为 Claude API)

## 快速开始

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 项目结构

```
src/
├── components/          # UI 组件
│   ├── Layout/         # 布局组件
│   ├── DailyRecommendation/  # 每日推荐
│   ├── LearningInterface/    # 学习界面
│   ├── Backlog/        # 待学习列表
│   └── History/        # 学习历史
├── contexts/           # React Context
│   └── AppContext.tsx  # 应用状态管理
├── types/              # TypeScript 类型定义
│   └── index.ts
├── utils/              # 工具函数
│   ├── constants.ts    # 常量配置
│   ├── mockData.ts     # 模拟数据
│   ├── storage.ts      # 本地存储
│   └── aiService.ts    # AI 服务
├── App.tsx             # 应用入口
├── main.tsx            # React 入口
└── index.css           # 全局样式
```

## MVP 特性

当前实现的 MVP 版本包括:

- ✅ 每日推荐 (3 选 1)
- ✅ 深度学习界面 (4 阶段 AI 引导式对话)
- ✅ 进度可视化
- ✅ 自动笔记提取
- ✅ Backlog 管理
- ✅ 学习历史
- ✅ LocalStorage 持久化

暂未实现:

- ⏳ 实际 RSS 抓取 (使用模拟数据)
- ⏳ 真实 AI API 集成 (使用模拟响应)
- ⏳ 用户账户系统
- ⏳ 云端同步

## 未来规划

1. **AI 集成**: 接入 Claude API 实现真实的智能对话
2. **内容源**: 支持实际的 RSS/社交媒体数据抓取
3. **个性化**: AI 学习用户偏好，提供更精准推荐
4. **高级功能**:
   - 话题关联图谱
   - 间隔重复复习
   - 导出学习笔记
   - 分享洞察

## 许可证

MIT
