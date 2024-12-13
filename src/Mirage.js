import { createServer } from "miragejs";
import { Skulpt } from "skulpt";

export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    routes() {
      this.get("/api/execute", () => {
        return {
          status: 200,
          data: {
            output: "Результат выполнения кода"
          }
        };
      });

      this.post("/api/execute", (schema, request) => {
        const { language, code } = request.requestBody;

        if (!code) {
          return {
            status: "error",
            error: "Код не может быть пустым"
          };
        }

        try {
          if (language === "javascript") {
            const result = eval(code);
            return {
              status: 200,
              data: {
                output: result
              }
            };
          } else if (language === "python") {
            const result = Skulpt.run(code);
            return {
              status: 200,
              data: {
                output: result
              }
            };
          } else {
            return {
              status: "error",
              error: "Язык программирования не поддерживается"
            };
          }
        } catch (error) {
          return {
            status: "error",
            error: error.message
          };
        }
      });
    }
  });

  return server;
}
