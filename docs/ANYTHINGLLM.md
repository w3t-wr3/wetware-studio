# AnythingLLM Setup Guide

Wetware Studio now supports AnythingLLM for local AI inference. This guide will help you set up AnythingLLM with Wetware Studio.

## Why AnythingLLM?

- ✅ **100% Local** - No API keys needed, runs entirely on your machine
- ✅ **Privacy** - Your code never leaves your computer
- ✅ **No Cost** - No API usage fees
- ✅ **Multi-Model Support** - Works with any LLM provider (Ollama, LM Studio, etc.)
- ✅ **Document Management** - Built-in RAG and document handling
- ✅ **Easy Setup** - User-friendly interface

## Installation Steps

### 1. Download AnythingLLM

Download and install AnythingLLM Desktop from [useanything.com](https://useanything.com/)

**Supported Platforms:**
- macOS (Apple Silicon & Intel)
- Windows
- Linux

### 2. Install and Launch AnythingLLM

1. **Install** the application
2. **Launch** AnythingLLM
3. The app will start on `http://localhost:3001` by default

### 3. Configure Your LLM Provider

AnythingLLM supports multiple backends:

#### Option A: Use Built-in LLM
1. Go to **Settings** → **LLM Preferences**
2. Choose **AnythingLLM**'s built-in LLM
3. Select a model to download

#### Option B: Connect to LM Studio
1. Start **LM Studio** with a loaded model
2. In AnythingLLM, go to **Settings** → **LLM Preferences**
3. Select **LM Studio** as provider
4. Set URL to `http://localhost:1234`

#### Option C: Connect to Ollama
1. Install and run **Ollama** with a model
2. In AnythingLLM, go to **Settings** → **LLM Preferences**
3. Select **Ollama** as provider
4. Set URL to `http://localhost:11434`

#### Option D: Use Cloud Providers
- OpenAI
- Anthropic
- Google
- Azure
- And many more...

### 4. Get Your API Key (Optional)

AnythingLLM can run without an API key, but for API access:

1. In AnythingLLM, go to **Settings** → **API Keys**
2. Click **Generate New API Key**
3. Copy the API key
4. Keep it safe - you'll need it for Wetware Studio

### 5. Configure Wetware Studio

1. **Open** your `.env.local` file in Wetware Studio
2. **Add** the following:

```bash
# AnythingLLM Configuration
ANYTHINGLLM_API_BASE_URL=http://localhost:3001
ANYTHINGLLM_API_KEY=your-api-key-here  # Optional, only if you want API authentication
```

3. **Save** the file
4. **Restart** Wetware Studio (`pnpm dev`)

### 6. Select the Model in Wetware Studio

1. **Open** Wetware Studio in your browser
2. **Click** the model selector dropdown
3. **Select** "AnythingLLM" as the provider
4. **Choose** your model from the list

## Configuration Options

### Without API Key (Local Only)

```bash
# Minimal config - no authentication
ANYTHINGLLM_API_BASE_URL=http://localhost:3001
```

### With API Key (Recommended for Security)

```bash
# Full config with authentication
ANYTHINGLLM_API_BASE_URL=http://localhost:3001
ANYTHINGLLM_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Custom Port

If AnythingLLM is running on a different port:

```bash
ANYTHINGLLM_API_BASE_URL=http://localhost:YOUR_PORT
```

## Recommended Models

### For Coding (via Ollama)
- **DeepSeek Coder 33B** - Excellent code generation
- **CodeLlama 34B** - Meta's coding model
- **Qwen2.5 Coder 32B** - Strong reasoning for code

### For Coding (via LM Studio)
- **Qwen3 Coder 30B** - Recommended (see [LM Studio Guide](LMSTUDIO.md))
- **DeepSeek Coder 33B**
- **CodeLlama 34B**

### General Purpose
- **Llama 3.1 70B** - Best all-around performance
- **Mixtral 8x7B** - Fast and capable
- **Mistral 7B** - Lightweight option

## Troubleshooting

### AnythingLLM Not Responding
- **Check if running**: Open `http://localhost:3001` in your browser
- **Verify port**: Make sure AnythingLLM is using port 3001
- **Restart AnythingLLM**: Close and reopen the application

### No Models Available
- **Check LLM Provider**: Go to AnythingLLM Settings → LLM Preferences
- **Verify Backend**: Make sure your chosen backend (Ollama, LM Studio, etc.) is running
- **Download Models**: Ensure models are downloaded in your chosen backend

### Connection Refused
- **Check URL**: Verify `ANYTHINGLLM_API_BASE_URL` is correct
- **Firewall**: Make sure your firewall isn't blocking port 3001
- **Docker**: If running in Docker, use `host.docker.internal` instead of `localhost`

### API Key Issues
- **Try Without Key**: AnythingLLM works without an API key for local use
- **Regenerate Key**: Create a new API key in AnythingLLM settings
- **Check Format**: API key should start with `sk-`

## Features

### Document Management
AnythingLLM has built-in RAG (Retrieval Augmented Generation):
1. Upload your documentation
2. AnythingLLM will use it as context
3. Get more accurate responses based on your docs

### Workspace Support
Create different workspaces for different projects:
- Each workspace can have its own documents
- Separate conversation history
- Different LLM configurations

### Chat History
- All conversations are stored locally
- Export/import chat history
- Search through past conversations

## Performance Tips

1. **Use Local Backend**: Ollama or LM Studio for best performance
2. **Allocate Enough RAM**: 16GB+ recommended for larger models
3. **Enable GPU**: Use CUDA (Nvidia) or Metal (Mac) acceleration
4. **Adjust Context**: Lower context window for faster responses
5. **Close Other Apps**: Free up resources for the LLM

## Advantages Over LM Studio Alone

- **Document RAG**: Built-in document understanding
- **Workspace Management**: Organize projects better
- **Multi-Provider**: Switch between different LLM backends easily
- **Web UI**: More user-friendly interface
- **History Management**: Better conversation tracking

## Questions?

If you encounter issues, check:
- [AnythingLLM Documentation](https://docs.useanything.com/)
- [AnythingLLM Discord](https://discord.gg/6UyHPeGZAC)
- [Wetware Studio Issues](https://github.com/MyrmtolioDebroudon/wetware-studio/issues)
