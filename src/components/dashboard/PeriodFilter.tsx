import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, ChevronDown, BarChart2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { usePeriod, PeriodPreset, PeriodGranularity } from '@/contexts/PeriodContext';

const presetLabels: Record<PeriodPreset, string> = {
  'today': 'Hoje',
  'yesterday': 'Ontem',
  'last-7-days': 'Últimos 7 dias',
  'last-30-days': 'Últimos 30 dias',
  'this-month': 'Este mês',
  'last-month': 'Mês anterior',
  'this-year': 'Este ano',
  'custom': 'Personalizado'
};

const granularityLabels: Record<PeriodGranularity, string> = {
  'daily': 'Diário',
  'weekly': 'Semanal',
  'monthly': 'Mensal',
  'yearly': 'Anual'
};

export const PeriodFilter: React.FC = () => {
  const {
    currentPeriod,
    granularity,
    preset,
    isComparing,
    setGranularity,
    setPreset,
    setPeriod,
    setIsComparing
  } = usePeriod();

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [customStartDate, setCustomStartDate] = useState<Date | undefined>(currentPeriod.startDate);
  const [customEndDate, setCustomEndDate] = useState<Date | undefined>(currentPeriod.endDate);

  const handlePresetClick = (presetValue: PeriodPreset) => {
    setPreset(presetValue);
  };

  const handleCustomDateSelect = () => {
    if (customStartDate && customEndDate) {
      setPeriod({
        startDate: customStartDate,
        endDate: customEndDate
      });
      setPreset('custom');
      setIsCalendarOpen(false);
    }
  };

  const formatPeriodDisplay = () => {
    if (preset !== 'custom') {
      return presetLabels[preset];
    }
    return `${format(currentPeriod.startDate, 'dd/MM/yyyy')} - ${format(currentPeriod.endDate, 'dd/MM/yyyy')}`;
  };

  return (
    <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 lg:items-center bg-card rounded-lg p-4 border">
      {/* Quick Period Buttons */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(presetLabels) as PeriodPreset[])
          .filter(p => p !== 'custom')
          .map((presetValue) => (
          <Button
            key={presetValue}
            variant={preset === presetValue ? "default" : "outline"}
            size="sm"
            onClick={() => handlePresetClick(presetValue)}
            className="text-xs"
          >
            {presetLabels[presetValue]}
          </Button>
        ))}
      </div>

      <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-3 lg:items-center">
        {/* Granularity Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">Granularidade:</span>
          <Select value={granularity} onValueChange={(value: PeriodGranularity) => setGranularity(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(granularityLabels) as PeriodGranularity[]).map((gran) => (
                <SelectItem key={gran} value={gran}>
                  {granularityLabels[gran]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Custom Date Picker */}
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="justify-between min-w-[200px]">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-4 w-4" />
                <span className="text-xs">{formatPeriodDisplay()}</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="p-4 space-y-4">
              <div className="text-sm font-medium">Período Customizado</div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground">Data Inicial</label>
                  <Calendar
                    mode="single"
                    selected={customStartDate}
                    onSelect={setCustomStartDate}
                    className="pointer-events-auto"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Data Final</label>
                  <Calendar
                    mode="single"
                    selected={customEndDate}
                    onSelect={setCustomEndDate}
                    className="pointer-events-auto"
                  />
                </div>
              </div>
              <Button 
                onClick={handleCustomDateSelect}
                className="w-full"
                disabled={!customStartDate || !customEndDate}
              >
                Aplicar Período
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Comparison Toggle */}
        <div className="flex items-center space-x-2">
          <Button
            variant={isComparing ? "default" : "outline"}
            size="sm"
            onClick={() => setIsComparing(!isComparing)}
            className="text-xs"
          >
            <BarChart2 className="h-4 w-4 mr-1" />
            Comparar
          </Button>
        </div>
      </div>

      {/* Period Display */}
      <div className="flex items-center space-x-2 lg:ml-auto">
        <Badge variant="secondary" className="text-xs">
          {formatPeriodDisplay()}
        </Badge>
        {isComparing && (
          <Badge variant="outline" className="text-xs">
            vs. período anterior
          </Badge>
        )}
      </div>
    </div>
  );
};