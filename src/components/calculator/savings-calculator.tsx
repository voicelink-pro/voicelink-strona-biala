"use client";

import { useMemo, useState } from "react";
import { CalendarCheck, Clock, Info, Settings, Users, Wallet } from "lucide-react";
import { TestVoiceLinkDialog } from "@/components/calculator/test-voicelink-dialog";
import {
  calculateSavings,
  DEFAULT_CALCULATOR_INPUTS,
  matchScenario,
  SCENARIOS,
  TARGET_NO_SHOW_RATE,
  type ScenarioId,
} from "@/lib/savings-calculator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldSeparator, FieldTitle } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { FadeIn } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

function fmtInt(value: number) {
  return Math.round(value).toLocaleString("pl-PL");
}

function fmtHours(value: number) {
  return value.toLocaleString("pl-PL", {
    minimumFractionDigits: value >= 10 ? 0 : 1,
    maximumFractionDigits: 1,
  });
}

function fmtFte(value: number) {
  return value.toLocaleString("pl-PL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function fmtMoney(value: number) {
  return `${fmtInt(value)} zł`;
}

function fmtMoneyExact(value: number) {
  return `${value.toLocaleString("pl-PL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} zł`;
}

function InfoTip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="inline-flex size-5 items-center justify-center rounded-full border border-border text-muted-foreground"
          aria-label={label}
        >
          <Info className="size-3" />
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs text-pretty leading-relaxed">{children}</TooltipContent>
    </Tooltip>
  );
}

function FieldSlider({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step,
  display,
  minLabel,
  maxLabel,
  tooltip,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  display: string;
  minLabel: string;
  maxLabel: string;
  tooltip?: React.ReactNode;
}) {
  return (
    <Field>
      <div className="flex items-center justify-between gap-3">
        <FieldTitle>
          {label}
          {tooltip ? <InfoTip label={`Wyjaśnienie: ${label}`}>{tooltip}</InfoTip> : null}
        </FieldTitle>
        <Badge variant="outline">{display}</Badge>
      </div>
      <Slider
        id={id}
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(next) => {
          const nextValue = next[0];
          if (typeof nextValue === "number") onChange(nextValue);
        }}
        aria-label={label}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </Field>
  );
}

function ResultStat({
  value,
  label,
  hint,
  icon: Icon,
}: {
  value: string;
  label: string;
  hint: string;
  icon: typeof Clock;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-border bg-background p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
        <Icon className="size-4 text-primary" />
      </div>
      <p className="text-2xl font-bold tabular-nums text-foreground sm:text-3xl">{value}</p>
      <p className="text-sm leading-relaxed text-muted-foreground">{hint}</p>
    </div>
  );
}

export function SavingsCalculator() {
  const [dailyCalls, setDailyCalls] = useState(DEFAULT_CALCULATOR_INPUTS.dailyCalls);
  const [avgCallMinutes, setAvgCallMinutes] = useState(DEFAULT_CALCULATOR_INPUTS.avgCallMinutes);
  const [workDays, setWorkDays] = useState(DEFAULT_CALCULATOR_INPUTS.workDays);
  const [monthlyVisits, setMonthlyVisits] = useState(DEFAULT_CALCULATOR_INPUTS.monthlyVisits);
  const [employees, setEmployees] = useState(DEFAULT_CALCULATOR_INPUTS.employees);
  const [employerCost, setEmployerCost] = useState(DEFAULT_CALCULATOR_INPUTS.employerCost);
  const [noShowRate, setNoShowRate] = useState(DEFAULT_CALCULATOR_INPUTS.noShowRate);
  const [visitValue, setVisitValue] = useState(DEFAULT_CALCULATOR_INPUTS.visitValue);
  const [aiTakeover, setAiTakeover] = useState(DEFAULT_CALCULATOR_INPUTS.aiTakeover);

  const scenario = matchScenario(aiTakeover);

  const result = useMemo(
    () =>
      calculateSavings({
        dailyCalls,
        avgCallMinutes,
        workDays,
        monthlyVisits,
        employees,
        employerCost,
        noShowRate,
        visitValue,
        aiTakeover,
      }),
    [
      dailyCalls,
      avgCallMinutes,
      workDays,
      monthlyVisits,
      employees,
      employerCost,
      noShowRate,
      visitValue,
      aiTakeover,
    ]
  );

  function applyScenario(id: ScenarioId) {
    setAiTakeover(SCENARIOS[id].aiTakeover);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="flex flex-col gap-6 lg:col-span-3">
        <FadeIn>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Settings className="size-5 text-accent-500" />
                Dane Twojej placówki
              </CardTitle>
              <CardDescription>
                Wpisz ruch telefoniczny, dni pracy i wizyty osobno. 50 telefonów nie oznacza 50 wizyt.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <FieldSlider
                  id="daily-calls"
                  label="Połączenia dziennie"
                  value={dailyCalls}
                  onChange={setDailyCalls}
                  min={5}
                  max={5000}
                  step={5}
                  display={fmtInt(dailyCalls)}
                  minLabel="5"
                  maxLabel="5 000"
                />
                <FieldSlider
                  id="call-time"
                  label="Średni czas rozmowy"
                  value={avgCallMinutes}
                  onChange={setAvgCallMinutes}
                  min={1}
                  max={15}
                  step={0.5}
                  display={`${avgCallMinutes.toLocaleString("pl-PL")} min`}
                  minLabel="1 min"
                  maxLabel="15 min"
                />
                <FieldSlider
                  id="work-days"
                  label="Dni pracy placówki w miesiącu"
                  value={workDays}
                  onChange={setWorkDays}
                  min={10}
                  max={31}
                  step={1}
                  display={fmtInt(workDays)}
                  minLabel="10"
                  maxLabel="31"
                  tooltip="Domyślnie 22 dni robocze. Weekendowa przychodnia powinna ustawić więcej."
                />
                <FieldSlider
                  id="employees"
                  label="Pracownicy recepcji"
                  value={employees}
                  onChange={setEmployees}
                  min={1}
                  max={50}
                  step={1}
                  display={fmtInt(employees)}
                  minLabel="1"
                  maxLabel="50+"
                />
                <FieldSlider
                  id="employer-cost"
                  label="Miesięczny koszt pracodawcy / pracownik"
                  value={employerCost}
                  onChange={setEmployerCost}
                  min={4000}
                  max={15000}
                  step={250}
                  display={fmtMoney(employerCost)}
                  minLabel="4 000 zł"
                  maxLabel="15 000 zł"
                  tooltip="Wynagrodzenie brutto wraz ze składkami i pozostałymi kosztami zatrudnienia."
                />

                <FieldSeparator>Wizyty i no-show</FieldSeparator>

                <FieldSlider
                  id="monthly-visits"
                  label="Liczba wizyt miesięcznie"
                  value={monthlyVisits}
                  onChange={setMonthlyVisits}
                  min={50}
                  max={20000}
                  step={50}
                  display={fmtInt(monthlyVisits)}
                  minLabel="50"
                  maxLabel="20 000"
                  tooltip="To osobne pole. Kalkulator nie wylicza wizyt z liczby telefonów."
                />
                <FieldSlider
                  id="no-show-rate"
                  label="Aktualny wskaźnik no-show"
                  value={noShowRate}
                  onChange={setNoShowRate}
                  min={5}
                  max={70}
                  step={1}
                  display={`${noShowRate}%`}
                  minLabel="5%"
                  maxLabel="70%"
                />
                <FieldSlider
                  id="visit-value"
                  label="Średnia wartość wizyty"
                  value={visitValue}
                  onChange={setVisitValue}
                  min={50}
                  max={1000}
                  step={25}
                  display={fmtMoney(visitValue)}
                  minLabel="50 zł"
                  maxLabel="1 000 zł"
                />
              </FieldGroup>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.08}>
          <Card>
            <CardHeader>
              <CardTitle>Scenariusz założeń</CardTitle>
              <CardDescription>
                Domyślnie liczymy wariant realistyczny. Założenia są widoczne i możesz je zmienić.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldTitle>Wariant kalkulacji</FieldTitle>
                  <ToggleGroup
                    type="single"
                    value={scenario === "custom" ? "" : scenario}
                    onValueChange={(value) => {
                      if (value === "conservative" || value === "realistic" || value === "maximal") {
                        applyScenario(value);
                      }
                    }}
                    spacing={2}
                    className="w-full"
                    aria-label="Scenariusz założeń"
                  >
                    {Object.values(SCENARIOS).map((item) => (
                      <ToggleGroupItem key={item.id} value={item.id} className="flex-1">
                        {item.label}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                  <FieldDescription>
                    {scenario === "custom"
                      ? "Własne założenia — liczby poniżej nie odpowiadają gotowemu scenariuszowi."
                      : SCENARIOS[scenario].description}
                  </FieldDescription>
                </Field>

                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full min-w-[28rem] text-left text-sm">
                    <caption className="sr-only">Założenia scenariuszy kalkulatora</caption>
                    <thead className="bg-muted text-muted-foreground">
                      <tr>
                        <th scope="col" className="px-3 py-2 font-medium">
                          Założenie
                        </th>
                        {Object.values(SCENARIOS).map((item) => (
                          <th
                            key={item.id}
                            scope="col"
                            className={cn(
                              "px-3 py-2 font-medium",
                              scenario === item.id && "text-foreground"
                            )}
                          >
                            {item.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {(
                        [
                          ["Rozmowy przejmowane przez AI", "aiTakeover"],
                        ] as const
                      ).map(([label, key]) => (
                        <tr key={key} className="border-t border-border">
                          <th scope="row" className="px-3 py-2 font-medium text-foreground">
                            {label}
                          </th>
                          {Object.values(SCENARIOS).map((item) => (
                            <td
                              key={item.id}
                              className={cn(
                                "px-3 py-2 tabular-nums text-muted-foreground",
                                scenario === item.id && "font-semibold text-foreground"
                              )}
                            >
                              {item[key]}%
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <FieldSlider
                  id="ai-takeover"
                  label="Rozmowy przejmowane przez AI"
                  value={aiTakeover}
                  onChange={setAiTakeover}
                  min={50}
                  max={99}
                  step={1}
                  display={`${aiTakeover}%`}
                  minLabel="50%"
                  maxLabel="99%"
                  tooltip="Konserwatywnie 60%, realistycznie 85%, maksymalnie 99%."
                />
                <p className="text-sm text-muted-foreground">
                  No-show liczymy zawsze jako spadek z obecnego wskaźnika do {TARGET_NO_SHOW_RATE}%.
                </p>
              </FieldGroup>

              <Alert>
                <Info />
                <AlertTitle>Koszt rozmowy liczymy z czasu pracy, nie z całego etatu</AlertTitle>
                <AlertDescription>
                  Recepcja nie spędza 100% czasu przy telefonie. Przy {employees}{" "}
                  {employees === 1 ? "osobie" : "osobach"} koszt godziny to {fmtMoneyExact(result.hourlyCost)}, a
                  rozmowa {avgCallMinutes.toLocaleString("pl-PL")} min kosztuje czasowo {fmtMoneyExact(result.costPerCall)}.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </FadeIn>
      </div>

      <div className="lg:col-span-2">
        <FadeIn delay={0.12}>
          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <Card>
              <CardHeader>
                <CardTitle>Efekt wdrożenia VoiceLink</CardTitle>
                <CardDescription>
                  {fmtHours(result.monthlyCallHours)} godz. rozmów miesięcznie, z czego VoiceLink przejmuje {aiTakeover}%.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResultStat
                  icon={Clock}
                  value={`${fmtHours(result.recoveredHours)} h / mies.`}
                  label="Odzyskany czas recepcji"
                  hint="Czas, który zespół może przeznaczyć na pacjentów w placówce, dokumentację i zadania wymagające człowieka."
                />
                <ResultStat
                  icon={Users}
                  value={`${fmtFte(result.fteEquivalent)} etatu`}
                  label="Dodatkowa przepustowość zespołu"
                  hint="Zyskujesz przepustowość bez zwiększania zespołu."
                />
                <ResultStat
                  icon={Wallet}
                  value={`${fmtMoney(result.timeValue)} / mies.`}
                  label="Wartość odzyskanego czasu"
                  hint="To wartość czasu pracy, nie gotówkowa oszczędność — dopóki placówka nie zmniejszy nadgodzin, outsourcingu albo zatrudnienia."
                />
                <ResultStat
                  icon={CalendarCheck}
                  value={`${fmtInt(result.recoveredVisits)} wizyt / mies.`}
                  label="Potencjalnie odzyskane wizyty"
                  hint={`${fmtInt(result.lostVisits)} utraconych wizyt przy ${noShowRate}% no-show. VoiceLink sprowadza wskaźnik do ${TARGET_NO_SHOW_RATE}%.`}
                />
                <ResultStat
                  icon={CalendarCheck}
                  value={`${fmtMoney(result.recoveredRevenue)} / mies.`}
                  label="Potencjalnie odzyskany przychód"
                  hint="Tylko efekt ograniczenia no-show. Nieodebrane telefony i ruch poza godzinami nie są doliczane."
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Potencjalny efekt ekonomiczny</CardTitle>
                <CardDescription>
                  {fmtMoney(result.timeValue)} wartości odzyskanego czasu + {fmtMoney(result.recoveredRevenue)}{" "}
                  przychodu z ograniczenia no-show.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-1 text-center">
                  <p className="text-4xl font-bold tabular-nums text-primary">{fmtMoney(result.economicEffectMonthly)}</p>
                  <p className="text-sm text-muted-foreground">miesięcznie</p>
                  <p className={cn("mt-2 text-xl font-semibold tabular-nums text-foreground")}>
                    {fmtMoney(result.economicEffectYearly)} / rok
                  </p>
                </div>
                <Separator />
                <Alert>
                  <AlertTitle>To nie jest obietnica zwolnień</AlertTitle>
                  <AlertDescription>
                    Wartość obejmuje odzyskany czas pracy oraz potencjalny dodatkowy przychód. Nie zakłada redukcji
                    zatrudnienia.
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter>
                <TestVoiceLinkDialog />
                <p className="text-center text-xs text-muted-foreground">
                  Asystent VoiceLink oddzwoni i pokaże, jak brzmi rozmowa
                </p>
              </CardFooter>
            </Card>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
