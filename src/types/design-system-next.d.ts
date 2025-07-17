declare module 'design-system-next' {
  import { App } from 'vue'
  
  interface SproutDesignSystem {
    install(app: App): void
  }
  
  const SproutDesignSystem: SproutDesignSystem
  export default SproutDesignSystem
}

declare module 'design-system-next/style.css'
