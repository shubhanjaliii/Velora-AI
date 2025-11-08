// pages/test.js
import { useState } from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const OPTIONS = {
  gender: ["Female","Male","Non-binary","Prefer not to say"],
  ageBrackets: ["<18","18-25","26-35","36-45","46+"],
  skinTypes: ["Oily","Dry","Combination","Normal","Sensitive"],
  skinConcerns: ["Acne","Pigmentation","Dullness","Wrinkles/Fine lines","Redness","Uneven tone","Dark circles","Pores","Dry patches","Sensitivity"],
  sleep: ["<4 hours","4-6 hours","6-8 hours","8+ hours"],
  water: ["<1L","1-2L","2-3L","3L+"],
  stress: ["Low","Moderate","High"],
  smoking: ["Non-smoker","Occasional","Regular"],
  alcohol: ["Never","Sometimes","Frequent"],
  outdoor: ["<30 min","30-60 min","1-3 hours","3+ hours"],
  sunscreen: ["Never","Sometimes","Daily"],
  pollution: ["Low","Moderate","High"],
  products: ["Sunscreen","Serum","Cleanser","Toner","Moisturizer","Exfoliant","Eye cream"]
};

export default function TestPage(){
  const [form, setForm] = useState({
    name: "",
    gender: "",
    ageBracket: "",
    skinType: "",
    skinConcerns: [],
    sleep: "",
    water: "",
    stress: "",
    smoking: "",
    alcohol: "",
    outdoorTime: "",
    sunscreenUse: "",
    pollution: "",
    cleanse: "No",
    exfoliate: "No",
    currentProducts: [],
    allergiesKnown: "No",
    allergiesDetails: "",
    knownConditions: "No",
    knownConditionsDetails: ""
  });

  const [result, setResult] = useState(null);

  function handleChange(k,v){ setForm(prev => ({...prev, [k]: v})); }
  function toggleArray(key, val){
    setForm(prev => {
      const s = new Set(prev[key] || []);
      if(s.has(val)) s.delete(val); else s.add(val);
      return {...prev, [key]: Array.from(s)};
    });
  }

  function handleSubmit(e){
    e.preventDefault();
    setResult(form); // later: POST to /api/analyze
  }

  return (
    <main className={styles.testWrapper}>
      <div className={styles.testCard}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 8 }}>
          <h2 style={{ margin:0, fontFamily: "Playfair Display, serif" }}>Velora.ai — Skin Test</h2>
         <Link href="/" style={{ color: "var(--muted)", textDecoration: "none" }}>Back home</Link>
        </div>

        <form onSubmit={handleSubmit}>
          {/* PERSONAL */}
          <div className={styles.field}>
            <label className={styles.labelText}>Name</label>
            <input className={styles.input} value={form.name} onChange={(e)=>handleChange("name", e.target.value)} placeholder="Your name" />
          </div>

          <div style={{ display:'grid', gridTemplateColumns: '1fr 1fr', gap:12 }}>
            <div className={styles.field}>
              <label className={styles.labelText}>Gender</label>
              <select className={styles.select} value={form.gender} onChange={(e)=>handleChange("gender", e.target.value)}>
                <option value="">Choose</option>
                {OPTIONS.gender.map(g=> <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.labelText}>Age bracket</label>
              <select className={styles.select} value={form.ageBracket} onChange={(e)=>handleChange("ageBracket", e.target.value)}>
                <option value="">Choose</option>
                {OPTIONS.ageBrackets.map(a=> <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>

          {/* Skin type / concerns */}
          <div className={styles.field}>
            <label className={styles.labelText}>Skin type</label>
            <select className={styles.select} value={form.skinType} onChange={(e)=>handleChange("skinType", e.target.value)}>
              <option value="">Choose</option>
              {OPTIONS.skinTypes.map(s=> <option key={s}>{s}</option>)}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.labelText}>Skin concerns (select all that apply)</label>
            <div className={styles.checkboxGroup}>
              {OPTIONS.skinConcerns.map(c => (
                <label className={styles.checkboxItem} key={c}>
                  <input type="checkbox" className={styles.checkboxInput} checked={form.skinConcerns.includes(c)} onChange={()=>toggleArray("skinConcerns", c)} />
                  <span className={styles.checkboxLabel}>{c}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Lifestyle grid */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <div className={styles.field}>
              <label className={styles.labelText}>Hours of sleep</label>
              <select className={styles.select} value={form.sleep} onChange={e=>handleChange("sleep", e.target.value)}>
                <option value="">Choose</option>
                {OPTIONS.sleep.map(s=> <option key={s}>{s}</option>)}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.labelText}>Water intake / day</label>
              <select className={styles.select} value={form.water} onChange={e=>handleChange("water", e.target.value)}>
                <option value="">Choose</option>
                {OPTIONS.water.map(w=> <option key={w}>{w}</option>)}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.labelText}>Stress level</label>
              <select className={styles.select} value={form.stress} onChange={e=>handleChange("stress", e.target.value)}>
                <option value="">Choose</option>
                {OPTIONS.stress.map(s=> <option key={s}>{s}</option>)}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.labelText}>Smoking habit</label>
              <select className={styles.select} value={form.smoking} onChange={e=>handleChange("smoking", e.target.value)}>
                <option value="">Choose</option>
                {OPTIONS.smoking.map(s=> <option key={s}>{s}</option>)}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.labelText}>Alcohol consumption</label>
              <select className={styles.select} value={form.alcohol} onChange={e=>handleChange("alcohol", e.target.value)}>
                <option value="">Choose</option>
                {OPTIONS.alcohol.map(a=> <option key={a}>{a}</option>)}
              </select>
            </div>
          </div>

          {/* Sun & environment */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:12 }}>
            <div className={styles.field}>
              <label className={styles.labelText}>Time outdoors daily</label>
              <select className={styles.select} value={form.outdoorTime} onChange={e=>handleChange("outdoorTime", e.target.value)}>
                <option value="">Choose</option>
                {OPTIONS.outdoor.map(o=> <option key={o}>{o}</option>)}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.labelText}>Sunscreen usage</label>
              <select className={styles.select} value={form.sunscreenUse} onChange={e=>handleChange("sunscreenUse", e.target.value)}>
                <option value="">Choose</option>
                {OPTIONS.sunscreen.map(s=> <option key={s}>{s}</option>)}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.labelText}>Pollution in your area</label>
              <select className={styles.select} value={form.pollution} onChange={e=>handleChange("pollution", e.target.value)}>
                <option value="">Choose</option>
                {OPTIONS.pollution.map(p=> <option key={p}>{p}</option>)}
              </select>
            </div>
          </div>

          {/* Current skincare */}
          <div style={{ marginTop:12 }}>
            <div className={styles.field}>
              <label className={styles.labelText}>Do you cleanse?</label>
              <div style={{ display:"flex", gap:12 }}>
                {["Yes","No"].map(opt=> (
                  <label key={opt}>
                    <input type="radio" name="cleanse" checked={form.cleanse===opt} onChange={()=>handleChange("cleanse", opt)} /> {opt}
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.labelText}>Do you exfoliate?</label>
              <div style={{ display:"flex", gap:12 }}>
                {["Yes","No"].map(opt=> (
                  <label key={opt}>
                    <input type="radio" name="exfoliate" checked={form.exfoliate===opt} onChange={()=>handleChange("exfoliate", opt)} /> {opt}
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.labelText}>Products you currently use</label>
              <div className={styles.checkboxGroup}>
                {OPTIONS.products.map(p=> (
                  <label className={styles.checkboxItem} key={p}>
                    <input type="checkbox" className={styles.checkboxInput} checked={form.currentProducts.includes(p)} onChange={()=>toggleArray("currentProducts", p)} />
                    <span className={styles.checkboxLabel}>{p}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Allergies / conditions */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:12 }}>
            <div className={styles.field}>
              <label className={styles.labelText}>Any known allergies?</label>
              <div style={{ display:"flex", gap:12 }}>
                {["No","Yes"].map(opt=> <label key={opt}><input type="radio" name="allergies" checked={form.allergiesKnown===opt} onChange={()=>handleChange("allergiesKnown", opt)} /> {opt}</label>)}
              </div>
              {form.allergiesKnown==="Yes" && <input className={styles.input} placeholder="Specify allergies" value={form.allergiesDetails} onChange={e=>handleChange("allergiesDetails", e.target.value)} />}
            </div>

            <div className={styles.field}>
              <label className={styles.labelText}>Any diagnosed skin conditions?</label>
              <div style={{ display:"flex", gap:12 }}>
                {["No","Yes"].map(opt=> <label key={opt}><input type="radio" name="cond" checked={form.knownConditions===opt} onChange={()=>handleChange("knownConditions", opt)} /> {opt}</label>)}
              </div>
              {form.knownConditions==="Yes" && <input className={styles.input} placeholder="Specify condition" value={form.knownConditionsDetails} onChange={e=>handleChange("knownConditionsDetails", e.target.value)} />}
            </div>
          </div>

          <div style={{ marginTop:16 }}>
            <button className={styles.buttonPrimary} type="submit">Get Recommendation</button>
          </div>
        </form>

        {result && (
          <div className={styles.result}>
            <h4>Collected Answers</h4>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </main>
  );
}