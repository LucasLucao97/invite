'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
import styles from "./styles.module.css";

export default function LanguageSelector() {
  const router = useRouter();
  const [name, setName] = useState('')
  const [language, setLanguage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/birthdayInvitation/${name}?language=${language}`);
  }

  return (
    <div className={styles['language-selector-container']}>
      <div className={styles['language-selector-card']}>
        <h1 className={styles['language-selector-title']}>Welcome</h1>
        <form onSubmit={handleSubmit} className={styles['language-selector-form']}>
          <div>
            <Label htmlFor="name" className={styles['language-selector-label']}>Your name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              style={{color: "black !important"}}
              required
              className="input-nome"
            />
          </div>
          <div>
            <Label className={styles['language-selector-label']}>Choose your language</Label>
            <RadioGroup value={language} onValueChange={setLanguage} className={styles['language-selector-radio-group']}>
              <div className={styles['language-selector-radio-option']}>
                <RadioGroupItem value="pt" id="pt" className={styles['language-selector-radio-input']} />
                <Label htmlFor="pt" className="flex items-center space-x-2 cursor-pointer">
                  <img src="https://flagcdn.com/w40/br.png" alt="Brazil Flag" className={styles['language-selector-flag']} />
                  <span className={styles['language-selector-language-text']}>Portuguese</span>
                </Label>
              </div>
              <div className={styles['language-selector-radio-option']}>
                <RadioGroupItem value="es" id="es" className={styles['language-selector-radio-input']} />
                <Label htmlFor="es" className="flex items-center space-x-2 cursor-pointer">
                  <img src="https://flagcdn.com/w40/ar.png" alt="Argentina Flag" className={styles['language-selector-flag']} />
                  <span className={styles['language-selector-language-text']}>Spanish</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
          <Button type="submit" className={styles['language-selector-submit-button']}>
            Confirm Selection
          </Button>
        </form>
      </div>
    </div>
  )
}