# 1. Use Node 18 as the base
FROM node:18-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# 2. Set the working directory
WORKDIR /app

# 3. Copy the entire monorepo
# (Turborepo needs the root files to understand the workspace)
COPY . .

# 4. Install dependencies
RUN pnpm install

# 5. Build the API
RUN pnpm --filter api build

# 6. Expose the port (match your App Runner config)
EXPOSE 3000

# 7. Start the API
CMD [ "pnpm", "--filter", "api", "start" ]
