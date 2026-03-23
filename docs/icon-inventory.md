# Audyt ikon VoiceLink

Stan na teraz:
- biblioteka: `lucide-react`
- liczba unikalnych ikon: `100`
- plik z listą nazw (do budowy custom setu): `src/content/icon-catalog.ts`
- centralny komponent pod podmianę: `src/components/ui/icon.tsx`

## Jak podmieniać na własne

1. Dodaj własny komponent SVG (React) np. `src/components/icons/brand-phone.tsx`.
2. Podłącz go w `customIconRegistry` w `src/components/ui/icon.tsx`:
   - `customIconRegistry.Phone = BrandPhoneIcon`
3. W miejscach, gdzie chcesz już korzystać centralnie, używaj:
   - `<Icon name="Phone" className="h-5 w-5" />`

## Gdzie są ikony (strony)

- `/blog`: `BookOpen`
- `/branze`: `ArrowRight`, `Building2`, `CalendarClock`, `Eye`, `Heart`, `Hospital`, `Link2`, `MessageSquare`, `Smile`, `Users`
- `/branze/:slug`: `ArrowRight`, `Check`
- `/branze/centra-medyczne`: `ArrowDown`, `ArrowRight`, `BarChart3`, `Check`, `ClipboardList`, `Database`, `Key`, `Lock`, `MapPin`, `Phone`, `Shield`, `Terminal`, `Users`
- `/branze/gabinety-lekarskie`: `AlignJustify`, `ArrowDown`, `ArrowRight`, `BarChart3`, `CalendarClock`, `Check`, `ClipboardList`, `Clock`, `Heart`, `HelpCircle`, `Mail`, `Phone`, `Users`, `X`
- `/branze/gabinety-specjalistyczne`: `ArrowDown`, `ArrowRight`, `ArrowRightLeft`, `Beaker`, `BookOpen`, `CalendarClock`, `CheckCircle`, `ClipboardList`, `Clock`, `Eye`, `FileText`, `Heart`, `Paintbrush`, `Phone`, `UserCircle`
- `/branze/gabinety-stomatologiczne`: `ArrowDown`, `ArrowRight`, `BarChart3`, `Bell`, `CalendarClock`, `Check`, `ClipboardList`, `Clock`, `DollarSign`, `HelpCircle`, `Phone`, `RefreshCw`, `Trash2`, `Users`, `Zap`
- `/branze/kliniki`: `ArrowDown`, `ArrowRight`, `BarChart3`, `CalendarCheck`, `Check`, `Headphones`, `Phone`, `Shield`, `Sparkles`, `Star`, `TrendingUp`, `Users`
- `/branze/przychodnie`: `AlertTriangle`, `ArrowDown`, `ArrowRight`, `ArrowRightLeft`, `BarChart3`, `Bell`, `Building2`, `CalendarClock`, `Check`, `CheckCircle`, `ClipboardList`, `Clock`, `FileText`, `Link2`, `MessageSquare`, `Phone`, `RefreshCw`, `Trash2`, `Users`
- `/cennik`: `ArrowRight`, `Calculator`, `CheckCircle`, `Clock`, `Maximize2`, `Tag`, `TrendingUp`, `Wallet`, `Zap`
- `/demo`: `Calculator`, `ClipboardList`, `Mail`, `Phone`, `PlayCircle`
- `/funkcje`: `AlertCircle`, `ArrowRight`, `CalendarCheck`, `CheckCircle`, `Clock`, `Database`, `Globe`, `MessageCircle`, `MessageSquare`, `Monitor`, `Phone`, `UserCircle`, `Users`
- `/integracje`: `ArrowRight`, `CheckCircle`, `Link2`, `Lock`, `MessageSquare`, `Plus`, `Shield`
- `/integracje/:slug`: `ArrowRight`, `Check`
- `/jak-to-dziala`: `ArrowRight`, `Calculator`, `CalendarClock`, `CheckCircle`, `ChevronDown`, `ClipboardList`, `Cpu`, `Link2`, `Monitor`, `Phone`, `PlayCircle`, `Shield`, `Zap`
- `/jak-to-dziala/proces`: `AlertTriangle`, `ArrowDown`, `ArrowRight`, `BarChart3`, `Brain`, `CalendarCheck`, `CheckCircle`, `ClipboardList`, `Clock`, `Globe`, `Lock`, `Mic`, `Phone`, `Plug`, `Search`, `Shield`, `Users`
- `/kalkulator-oszczednosci`: `ArrowRight`, `Calculator`, `CheckCircle`, `Info`, `Phone`, `Settings`, `TrendingUp`
- `/kontakt`: `Clock`, `Mail`, `MapPin`, `Phone`
- `/o-nas`: `ArrowRight`, `Phone`, `Settings`, `Shield`, `Users`, `Zap`
- `/plany-cenowe`: `AlertCircle`, `ArrowRight`, `BarChart3`, `CheckCircle`, `ChevronDown`, `Code2`, `DollarSign`, `Layers`, `Link2`, `MessageSquare`, `Phone`, `RefreshCw`, `Settings`, `TrendingUp`
- `/polityka-prywatnosci`: `ArrowLeft`
- `/regulamin`: `ArrowLeft`
- `/technologia-ai`: `ArrowRight`, `Brain`, `CalendarCheck`, `Check`, `CheckCircle`, `Clock`, `Lightbulb`, `MessageSquare`, `Mic`, `PlayCircle`, `Volume2`, `X`, `XCircle`, `Zap`
- `/uslugi`: `ArrowRight`, `CalendarCheck`, `Clock`, `LayoutDashboard`, `Mic`, `PhoneCall`
- `/uslugi/automatyzacja-rozmow`: `ArrowDown`, `ArrowRight`, `BarChart3`, `CalendarClock`, `Check`, `CheckCircle`, `ClipboardList`, `Clock`, `Info`, `MessageSquare`, `Phone`, `PhoneCall`, `Users`, `Zap`
- `/uslugi/obsluga-klienta-247`: `AlertTriangle`, `ArrowDown`, `ArrowRight`, `BarChart3`, `CalendarClock`, `Check`, `CheckCircle`, `ClipboardList`, `Clock`, `Database`, `FileText`, `Globe`, `HelpCircle`, `Mail`, `Shield`, `X`
- `/uslugi/panel-voicelink-center`: `Activity`, `ArrowDown`, `ArrowRight`, `BarChart3`, `CalendarCheck`, `Check`, `CheckCircle`, `ChevronRight`, `Clock`, `Eye`, `LayoutDashboard`, `LineChart`, `MessageSquareText`, `Phone`, `PieChart`, `ShieldCheck`, `Sparkles`, `Ticket`, `TrendingUp`
- `/uslugi/recepcjonistka-ai`: `ArrowDown`, `ArrowRight`, `ArrowRightLeft`, `BarChart3`, `Bell`, `Brain`, `CalendarClock`, `CalendarPlus`, `CalendarX`, `Check`, `CheckCircle`, `ClipboardList`, `Clock`, `FileText`, `Globe`, `Heart`, `HelpCircle`, `MessageSquare`, `Mic`, `Phone`, `Shield`, `Users`, `X`, `Zap`
- `/uslugi/rezerwacje-online`: `ArrowDown`, `ArrowRight`, `BarChart3`, `Bell`, `Calendar`, `Check`, `ChevronLeft`, `ChevronRight`, `Link2`, `MessageSquare`, `Plus`, `RefreshCw`, `Search`, `Trash2`, `X`

## Gdzie są ikony (komponenty wspólne)

- `components/layout/navbar.tsx`: `Building2`, `Calculator`, `CalendarCheck`, `ChevronDown`, `Clock`, `Cpu`, `Eye`, `FileText`, `Heart`, `Hospital`, `LayoutDashboard`, `Menu`, `Mic`, `PhoneCall`, `Play`, `Plug`, `Smile`, `Tag`, `Users`, `X`, `Zap`
- `components/layout/footer.tsx`: `Bot`, `Mail`, `MapPin`, `Phone`
- `components/sections/contact-section.tsx`: `Bot`, `CheckCircle`, `Mail`, `Phone`, `Send`
- `components/sections/hero-section.tsx`: `ArrowRight`, `Phone`, `PhoneOff`, `ShieldCheck`, `SmilePlus`, `Sparkles`
- `components/sections/features-grid.tsx`: `AlertTriangle`, `BarChart3`, `CalendarCheck`, `Clock`, `PhoneIncoming`, `TrendingUp`
- `components/sections/integrations-grid.tsx`: `BookOpen`, `CalendarClock`, `Globe`, `MessageCircle`, `PhoneForwarded`, `SendHorizonal`, `UserRoundCheck`, `Zap`
- `components/sections/problem-solution.tsx`: `ArrowRight`, `Check`, `Clock`, `Phone`, `PhoneOff`, `TrendingUp`, `Users`, `X`
- `components/sections/industry-cards.tsx`: `ArrowRight`, `Building2`, `Eye`, `Heart`, `HeartPulse`, `Hospital`, `Smile`, `Sparkles`, `Stethoscope`
- `components/sections/related-services.tsx`: `ArrowRight`, `CalendarCheck`, `Clock`, `LayoutDashboard`, `Mic`, `PhoneCall`
- `components/sections/security-highlights.tsx`: `ArrowRight`, `Eye`, `FileCheck`, `Lock`, `Server`, `Shield`, `Timer`
- `components/sections/trust-bar.tsx`: `FileCheck`, `Lock`, `Server`, `Shield`
- `components/blog/blog-card.tsx`: `ArrowRight`, `Clock`
- `components/blog/blog-featured.tsx`: `ArrowRight`, `Clock`
- `components/blog/blog-listing.tsx`: `ChevronLeft`, `ChevronRight`, `Search`, `SlidersHorizontal`, `X`
- `components/forms/contact-form.tsx`: `CheckCircle`, `Send`
- `components/forms/demo-form.tsx`: `CheckCircle`, `Send`
- `components/cookie-banner.tsx`: `Cookie`
- `components/layout/breadcrumbs.tsx`: `ChevronRight`
- `components/ui/accordion.tsx`: `ChevronDown`

## Pełna lista unikalnych ikon

`Activity, AlertCircle, AlertTriangle, AlignJustify, ArrowDown, ArrowLeft, ArrowRight, ArrowRightLeft, BarChart3, Beaker, Bell, BookOpen, Bot, Brain, Building2, Calculator, Calendar, CalendarCheck, CalendarClock, CalendarPlus, CalendarX, Check, CheckCircle, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, ClipboardList, Clock, Code2, Cookie, Cpu, Database, DollarSign, Eye, FileCheck, FileText, Globe, Headphones, Heart, HeartPulse, HelpCircle, Hospital, Info, Key, Layers, LayoutDashboard, Lightbulb, LineChart, Link2, Lock, Mail, MapPin, Maximize2, Menu, MessageCircle, MessageSquare, MessageSquareText, Mic, Monitor, Paintbrush, Phone, PhoneCall, PhoneForwarded, PhoneIncoming, PhoneOff, PieChart, Play, PlayCircle, Plug, Plus, RefreshCw, Search, Send, SendHorizonal, Server, Settings, Share2, Shield, ShieldCheck, SlidersHorizontal, Smile, SmilePlus, Sparkles, Star, Stethoscope, Tag, Terminal, Ticket, Timer, Trash2, TrendingUp, UserCircle, UserRoundCheck, Users, Volume2, Wallet, X, XCircle, Zap`
