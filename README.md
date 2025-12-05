# 本地开发

```bash
# 安装依赖
pnpm install
# 启动开发服务器
pnpm dev

# 访问
http://localhost:3001
```

# demo 网站

https://todo-five-bay.vercel.app/

# 功能要点

- 处理 api 请求的 race condition 问题
- 乐观更新

# 设计稿有带改进的

- 没有 api 请求的 loading 时的设计图
- 没有出错状态的设计图
- 没有空白数据的设计图
- 'new Task'按钮在点击后,最好 in-place 编辑,此时没有新的'New Task'按钮

# 其他

- title/newTask 输入框相设计稿做了少许优化
