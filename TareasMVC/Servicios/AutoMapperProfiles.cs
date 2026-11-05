using AutoMapper;
using TareasMVC.Entidades;
using TareasMVC.Models;

namespace TareasMVC.Servicios
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles() 
        {
            CreateMap<Tarea, TareaDTO>()
                .ForMember(dto => dto.PasosTotal, 
                ent => ent.MapFrom(x => x.pasos.Count()))
                .ForMember(dto => dto.PasosRealizados, ent => 
                ent.MapFrom(x => x.pasos.Where(p => p.Realizado).Count()));

        }
    }
}
