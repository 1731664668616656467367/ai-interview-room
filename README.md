# AI面试室模拟

> AI 模拟面试间 · 产品经理大厂校招压力面试 Agent

上传简历 → 自动解析候选人画像 → 选择大厂面试官风格 → 进入 AI 模拟面试间 → 实时动态追问 → 结束后生成面试诊断报告。

## 核心功能

- 落地页与完整面试流程引导
- DOCX 简历上传，服务端使用 `mammoth` 提取纯文本
- 从简历文本生成候选人画像（candidateProfile）
- 字节 / 腾讯等大厂面试官风格配置
- AI 面试间：支持文字对话，浏览器语音合成与语音识别作为增强
- 动态追问接口：根据已答内容实时生成下一问
- 面试诊断报告接口：输出结构化复盘与改进建议
- Mock 兜底：模型未配置或调用失败时自动回退，保证演示流程不中断

## 技术栈

- Next.js App Router
- React 19 + TypeScript
- `mammoth` 解析 DOCX
- OpenAI 兼容的 Chat Completions 文本模型
- 浏览器原生 `speechSynthesis` / `SpeechRecognition`

## 本地开发

```bash
npm install
npm run dev
```

打开终端输出的本地地址。

## 生产构建

```bash
npm run build
npm run start
```

## 环境变量

复制 `.env.example` 为 `.env.local`：

```env
NEXT_PUBLIC_DEMO_MODE=true

TEXT_MODEL_API_KEY=
TEXT_MODEL_BASE_URL=
TEXT_MODEL_NAME=

NEXT_PUBLIC_REALTIME_GATEWAY_URL=

DOUBAO_REALTIME_API_KEY=
DOUBAO_REALTIME_APP_ID=
DOUBAO_REALTIME_ENDPOINT=
DOUBAO_REALTIME_RESOURCE_ID=
DOUBAO_REALTIME_MODEL=
```

说明：

- `TEXT_MODEL_API_KEY` / `TEXT_MODEL_BASE_URL` / `TEXT_MODEL_NAME` 仅在服务端 API 路由读取，不会打进前端包。
- 不要把模型密钥写成 `NEXT_PUBLIC_` 前缀。
- `NEXT_PUBLIC_DEMO_MODE=true` 时整个流程走 Mock 兜底，演示稳定。
- 设为 `false` 时会走真实 DOCX 解析与真实模型调用。
- `NEXT_PUBLIC_REALTIME_GATEWAY_URL` 为可选的实时语音网关地址，未部署时留空即可。

## 在线体验路径

首页 → 上传 DOCX / 使用示例简历 → 候选人画像 → 面试官配置 → AI 面试间 → 诊断报告

## API 路由

- `POST /api/upload-docx`：multipart `file` 字段，仅允许 `.docx`，最大 5 MB，内存解析后返回 `rawText`
- `POST /api/extract-profile`：入参 `{ rawText }`，模型可用时调用模型，失败回退 `mockCandidateProfile`
- `POST /api/interview/next-question`：入参候选人画像、公司风格、面试记录、轮次，失败回退 mock 回合
- `POST /api/report/generate`：入参候选人画像、公司风格、面试记录、时长，失败回退 `mockReport`

## 部署安全

- 前端 API 调用均使用相对路径，如 `/api/upload-docx`
- 上传的 DOCX 仅在内存中解析，不落盘
- `localStorage` 读取有保护，缺失或损坏时回退 mock 数据
- 浏览器语音能力不支持或被拒绝时自动降级为文字模式
- 应用不请求摄像头权限
